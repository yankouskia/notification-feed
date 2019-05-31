const express = require('express');
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

const app = express();

require('express-ws')(app);

const transformTweet = t => ({
  message: t.text.length > 100 ? `${t.text.substring(0, 100)}...`: t.text,
  name: t.user.name.length > 12 ? `${t.user.name.substring(0, 11)}` : t.user.name,
  url: `https://twitter.com/${t.user.screen_name}`,
  image: t.user.profile_image_url_https,
});

app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../dist'));

const T = new Twit({
  consumer_key: twitter.apiKey,
  consumer_secret: twitter.secretKey,
  access_token: twitter.accessToken,
  access_token_secret: twitter.accessTokenSecret,
  timeout_ms: 60*1000,
});

app.get('/search', (req, res) => {
  const { search } = req.query;
  T.get('search/tweets', { q: search, count: 100 }, function(err, data, response) {
    if (!data || !data.statuses) return res.json([]);
    const messages = data.statuses.map(transformTweet);
    res.json(messages);
  })
});

app.get('/post', (req, res) => {
  T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
    res.json(data);
  });
});

app.ws('/stream', function(ws, req) {
  const { search } = req.query;
  const stream = T.stream('statuses/filter', { track: search });

  ws.on('close', () => stream.stop());
  const handler = throttle(function (tweet) {
    ws.send(JSON.stringify(transformTweet(tweet)));
  }, 1000);
  stream.on('tweet', handler);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Started on http://localhost:${port}/`));
