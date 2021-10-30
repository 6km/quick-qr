const electron = require("electron");
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require("path");
const fs = require("fs");
const electronDl = require('electron-dl');
const isDev = require("electron-is-dev");
const isMac = process.platform === 'darwin'
let mainWindow;


electronDl();


function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 680,
    frame: false,
    title: 'Quick QR',
    transparent: true,
    resizable: false,
    roundedCorners: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      devTools: isDev,
      preload: __dirname + '/preload.js'
    }
  });

  mainWindow.loadURL(
    isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`
  );

  ipcMain.on('asynchronous-message', function (evt, {message, args}) {
    switch (message) {
      case 'appMinimize':
        BrowserWindow.getFocusedWindow().minimize();
        break;
      case 'appExit':
        app.exit();
        break;
      case 'showSaveDialog':
        (async function () {
          const options = {
            title: 'Save as..',
            defaultPath: app.getPath('desktop') + '/qrcode.png'
          };
          dialog.showSaveDialog(options).then((file) => {
            const win = BrowserWindow.getFocusedWindow();
            if (file.filePath) {
              const directory = file.filePath.toString().split("\\");
              const filename = directory.pop();
              electronDl.download(win, args.url, {
                filename,
                directory: directory.join("\\"),
                openFolderWhenDone: true
              })
            }
          }).catch(err => {
            console.log(err)
          });
        })();
        break;
    }
  });

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
