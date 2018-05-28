const { app, BrowserWindow } = require('electron');
app.on('ready', () => {
  const win = new BrowserWindow({ width: 200, height: 100 });
  win.loadURL(`file://${__dirname}/index.html`);
});
