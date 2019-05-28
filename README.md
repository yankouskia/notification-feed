# notification-feed
Notification feed


## Intergation guide

```js
const script = document.createElement('script');

script.src = 'https://ec2-54-153-34-119.us-west-1.compute.amazonaws.com:3000//sdk.js';

script.onload = () => {
  window.notificator = new window.Notificator();
  window.notificator.render();
}

document.body.appendChild(script);

// to terminate widget:
// window.notificator.terminate();
```
