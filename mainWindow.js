// Module to create native browser window.
const {BrowserWindow} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
exports.win;

exports.createWindow = () => {
  // Create the browser window.
  this.win = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 310,
    minWidth: 350,
    maxWidth: 650
  });

  // and load the index.html of the app.
  this.win.loadURL(`file://${__dirname}/renderer/main.html`);

  // Open the DevTools.
  this.win.webContents.openDevTools();

  // Emitted when the window is closed.
  this.win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    this.win = null
  });
}
