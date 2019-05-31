const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get('search');

const options = {
  displayLength: 5000,
  inDuration: 400,
  outDuration: 200,
  activationPercent: 1,
  classes: 'toast-customization',
};

const createHtml = ({
  message,
  name,
  url,
  image,
}) => `
<div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-start; width: 100%;">
  <div style="margin: 5px; padding: 5px; width: 75px;">
    <img width="60px" src="${image}" alt="" class="circle responsive">
  </div>
  <div style="opacity: 1.0; display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; color: white;" class="vvv">
    <div style="font-size:14px; font-weight:700; font-family:Comic Sans MS, cursive, sans-serif; display: flex; align-items: center; justify-content: center;">
      <a style="color: white; padding: 3px; margin: 3px;" href="${url}" target="_blank">${name}</a>
    </div>
    <div style="height: 50px; line-height: 1.2; display: flex; justify-content: center; margin-right: 3px;">
      <span style="font-size:10px; font-weight:300; font-family:Lucida Console, Monaco, monospace; overflow: hidden; text-overflow: ellipsis;">
        ${message}
      </span>
    </div>
  </div>
</div>
`;

window.createToast = ({
  message,
  name,
  url,
  image,
}) => M.toast({
  ...options,
  html: createHtml({
    message,
    name,
    url,
    image,
  }),
});


const socket = new WebSocket(`ws://localhost:3000/stream?search=${search}`);
socket.onmessage = function (event) {
  const data = JSON.parse(event.data);
  window.createToast(data);
};
