# notification-feed
Notification feed


## Intergation guide

```js
const script = document.createElement('script');

script.src = 'http://localhost:3000/sdk.js';

script.onload = () => {
  window.notificator = new window.Notificator();
  window.notificator.render();
}

document.body.appendChild(script);

// to terminate widget:
// window.notificator.terminate();
```
