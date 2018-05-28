const $ = require('./jquery-3.3.1.min');
const { Socket } = require('net');
const { ipcRenderer } = require('electron');

let lastProb = 0;

$(document).ready(() => {
  updateMap();
  subscribe();
});

function updateMap() {
  const timestamp = new Date().getTime();
  $('#map').prop('src', `http://localhost:1997/map?${timestamp}`);
  setTimeout(updateMap, 5 * 1000);
}

function subscribe() {
  const socket = new Socket();
  socket.connect(1337, 'localhost');
  socket.on('data', (data) => {
    const newProb = parseInt(data.toString().trim(), 10);
    $('#prob').html(newProb);
    const diff = newProb - lastProb;
    if (diff >= 5) {
      notify('‼️⚡️', `Storm probability increased by ${diff} % !`);
    } else if (diff <= -5) {
      notify('⏬', `Storm probability decreased by ${-diff} % !`);
    }
    lastProb = newProb;
    ipcRenderer.send('newProb', newProb);
  });
}

function notify(title, body) {
  new Notification(`Storm Warn™️: ${title}`, { body });
}