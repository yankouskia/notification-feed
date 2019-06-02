![GitHub last commit](https://img.shields.io/github/last-commit/yankouskia/notification-feed.svg) [![GitHub contributors](https://img.shields.io/github/contributors/yankouskia/notification-feed.svg)](https://github.com/yankouskia/notification-feed/graphs/contributors) [![Twitter URL](https://img.shields.io/twitter/url/https/github.com/yankouskia/notification-feed.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fyankouskia%2Fnotification-feed&text=%23JavaScript%20%23OpenSource%0A%F0%9F%93%A3%20Secured%20notification%20feed%20%F0%9F%94%90%0A) ![GitHub package.json dynamic](https://img.shields.io/github/package-json/Keys/yankouskia/notification-feed.svg) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yankouskia/notification-feed/blob/master/LICENSE)

# notification-feed
- __Light__
- __Secured__
- __Integrated with twitter__
- __Easy to embed__

Notification feed. Currently integrated with Twitter ![Twitter URL](https://img.shields.io/twitter/url/https/github.com/yankouskia/notification-feed.svg?style=social). Work in progress, see roadmap below.

## Demo

Examples on these web sites are launched just for demonstrating purposes!

www.ucla.edu
:-------------------------:
<img src="./resources/ucla.gif" data-canonical-src="./resources/ucla.gif" width="1000" />

http://time.com
:-------------------------:
<img src="./resources/time.gif" data-canonical-src="./resources/time.gif" width="1000" />


## Intergation guide

If you do not have application at twitter dev go here to create one:
[Twitter Application Management](https://apps.twitter.com/). Your application
will be issued an `apiKey` (API Key), a `secretKey` (API secret key), an `accessToken` (Access token) and `accessTokenSecret` (Access token secret). Then just simplmy paste them into `server/env`.

To run notificator widget locally:

```sh
git clone https://github.com/yankouskia/notification-feed.git
cd notification-feed
yarn
yarn server
```

To run on any page of your resource:

```js
const script = document.createElement('script');

script.src = 'http://localhost:3000/sdk.js';

script.onload = () => {
  window.notificator = new window.Notificator({
    search: 'insert any phrase OR hashtag here',
  });

  window.notificator.render();
}

document.body.appendChild(script);

// to terminate widget:
window.notificator.terminate();
```

## Roadmap

- Customizable UI for each feed
- Facebook, Instagram, custom-service feeds
- Create SaS
- Provide as global npm package


## Contributing

`notification-feed` is open-source "SaS", opened for contributions.
Suggestions/issues/questions are highly appreciated as well!


### License

`notification-feed` is [MIT licensed](https://github.com/yankouskia/notification-feed/blob/master/LICENSE)
