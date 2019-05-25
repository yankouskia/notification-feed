const path = require('path');
const fs = require('fs');
const express = require('express');
const TwitterStrategy = require('passport-twitter');
const passport = require('passport');
const Twit = require('twit');
const { twitter } = require('./env');

const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

const DB_PATH = path.resolve(__dirname, 'db/users.json');

const app = express();

require('express-ws')(app);

const transformTweet = t => ({
  message: t.text.length > 100 ? `${t.text.substring(0, 100)}...`: t.text,
  name: t.user.name.length > 12 ? `${t.user.name.substring(0, 11)}` : t.user.name,
  url: `https://twitter.com/${t.user.screen_name}`,
  image: t.user.profile_image_url_https,
});

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'cookie_secret',
  name: 'cookie_name',
  resave: true,
  saveUninitialized: true,
}));
app.use(express.static(__dirname + '/../dist'));

app.use(passport.initialize());
app.use(passport.session());

const T = new Twit({
  consumer_key: twitter.apiKey,
  consumer_secret: twitter.secretKey,
  access_token: twitter.accessToken,
  access_token_secret: twitter.accessTokenSecret,
  timeout_ms: 60*1000,
});

passport.use(new TwitterStrategy({
    consumerKey: twitter.apiKey,
    consumerSecret: twitter.secretKey,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  async function(token, tokenSecret, profile, cb) {
    console.log(token, tokenSecret, profile, cb);

    try {
      const users = await new Promise((resolve, reject) => {
        fs.readFile(DB_PATH, 'utf8', (err, data) => {
          if (err) return reject(err);
          return resolve(JSON.parse(data));
        });
      });

      const user = users.find(user => user.id === profile.id);

      if (!user) {
        users.push(profile);

        await new Promise((resolve, reject) => {
          fs.writeFile(DB_PATH, JSON.stringify(users), 'utf8', err => {
            if (err) return reject(err);
            resolve();
          });
        });

        return cb(null, profile);
      } else {
        return cb(null, user);
      }
    } catch (err) {
      return cb(err);
    }

  },
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/'),
);

app.get('/search', (req, res) => {
  const { q } = req.query;
  T.get('search/tweets', { q, count: 100 }, function(err, data, response) {
    if (!data || !data.statuses) return res.json([]);
    const messages = data.statuses.map(transformTweet);
    res.json(messages);
  })
});

app.get('/post', (req, res) => {
  T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
    console.log(data);
    res.json(data);
  });
});

app.ws('/stream', function(ws, req) {
  const { q } = req.query;
  const stream = T.stream('statuses/filter', { track: q });

  ws.on('close', () => stream.stop());
  const handler = throttle(function (tweet) {
    ws.send(JSON.stringify(transformTweet(tweet)));
  }, 1000);
  stream.on('tweet', handler);
});

app.listen(3000, () => console.log('Started on http://127.0.0.1:3000'));
