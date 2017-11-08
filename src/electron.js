/**
 * Created by Administrator on 2017/11/7/007.
 */
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// import {app,BrowserWindow} from 'electron';
let window = null;

app.on('ready', function() {
	window = new BrowserWindow({width: 800, height: 600});
	window.loadURL(__dirname + '/electron.html');
	window.openDevTools();

  window.on('closed', () => {
    window = null;
  });
});