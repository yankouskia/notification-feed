![GitHub last commit](https://img.shields.io/github/last-commit/yankouskia/notification-feed.svg) ![GitHub contributors](https://img.shields.io/github/contributors/yankouskia/notification-feed.svg) ![Twitter URL](https://img.shields.io/twitter/url/https/github.com/yankouskia/notification-feed.svg?style=social) ![GitHub package.json dynamic](https://img.shields.io/github/package-json/Designed for/yankouskia/notification-feed.svg) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yankouskia/notification-feed/blob/master/LICENSE)

# notification-feed
Notification feed (Currently integrated with Twitter ![Twitter URL](https://img.shields.io/twitter/url/https/github.com/yankouskia/notification-feed.svg?style=social))

## Demo

Examples on these web sites are launched just for demonstrating purposes!

http://www.ucla.edu/           |  http://time.com/
:-------------------------:|:-------------------------:
<img src="./resources/time.gif" data-canonical-src="./resources/ucla.gif" width="400" />  |  <img src="./resources/public.png" data-canonical-src="./resources/public.png" width="400" />


## Intergation guide

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


## Contributing

`notification-feed` is open-source "SaS", opened for contributions.
Suggestions/issues/questions are highly appreciated as well!


### License

`notification-feed` is [MIT licensed](https://github.com/yankouskia/notification-feed/blob/master/LICENSE)
