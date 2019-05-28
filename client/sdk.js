class Notificator {
  constructor({
    style = {
      position: 'fixed',
      width: '300px',
      height: '420px',
      right: '20px',
      bottom: '20px',
    },
    search,
  } = {}) {
    this.style = style;
    this.search = search;

    this.init();
    this.isOpened = true;

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.isOpened = !this.isOpened;
    const height = this.isOpened ? '420px' : '20px';
    const text = this.isOpened ? '↓' : '↑';

    this.container.style.height = height;
    this.button.innerText = text;
  }

  init() {
    const container = document.createElement('div');
    Object.keys(this.style).forEach(prop => {
      container.style[prop] = this.style[prop];
    });

    container.style.transition = 'height 1.5s ease-in-out';

    const iframe = document.createElement('iframe');
    iframe.frameBorder = '0';
    iframe.style.width = '100%'
    iframe.style.height = '100%'
    iframe.src = `https://notification-feed.herokuapp.com/?q=${this.search}`;

    this.container = container;
    this.iframe = iframe;
    this.container.appendChild(this.iframe);

    this.createButton();
  }

  createButton() {
    const button = document.createElement('button');
    button.innerText = '↓';
    button.style.outline = 'none';
    button.style.borderRadius = '8px';
    button.style.width = '15px';
    button.style.height = '15px';
    button.style.position = 'absolute';
    button.style.left = '3px';
    button.style.top = '3px';
    button.style.display = 'flex';
    button.style.justifyContent = 'center';
    button.style.fontSize = '10px';
    button.style.fontWeight = '800';
    button.onclick = () => this.toggle();
    this.button = button;

    this.container.appendChild(button);
  }

  render() {
    document.body.appendChild(this.container);
  }

  terminate() {
    document.body.removeChild(this.container);
  }
}

window.Notificator = Notificator;
