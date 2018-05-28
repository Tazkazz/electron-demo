const { app, BrowserWindow, Tray, ipcMain } = require('electron');

let tray;

const newProb = (e, ...args) => {
  if (args[0] > 0) {
    tray.setImage('icons/lightning.png');
  } else {
    tray.setImage('icons/sun.png');
  }
}

app.on('ready', () => {
  const win = new BrowserWindow({ width: 400, height: 360 });
  win.loadURL(`file://${__dirname}/index.html`);
  tray = new Tray('icons/sun.png');
  ipcMain.on('newProb', newProb);
});
