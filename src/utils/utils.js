import isElectron from 'is-electron';
const { ipcRenderer } = window.require('electron');

export function sendMessage(msg) {
  if (isElectron()) {
    ipcRenderer.send('asynchronous-message', msg);
  }
}

export function isUrl(s) {
  /* eslint-disable no-useless-escape */
  var regexp = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  return regexp.test(s);
}
