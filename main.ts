import { app, BrowserWindow, screen, Menu, dialog, ipcRenderer, ipcMain  } from 'electron';
import * as path from 'path';
import * as url from 'url';
import electronSquirrel from 'electron-squirrel-startup';
import * as PDFWindow from 'electron-pdf-window';
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const fs = require('fs');

// import * as updater from './updater';

let win, serve, pdfWin;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

ipcMain.on('save-file', (event, arg) => {
  const filePath = 'D:/workspace/tool/smithsville-poc/pdf.pdf';
  const base64PDF = arg.split(';base64,').pop();
  fs.writeFile(filePath, base64PDF, { encoding: 'base64' }, function (err) {
  });
  pdfWin = new PDFWindow();

  pdfWin.loadURL(filePath);
});

let menu;
autoUpdater.autoDownload = false;

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Recent Folders',
        click () {
           console.log('****path****', app.getPath('desktop'));
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Call Angular Method',
        click (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.send('call-angular-method');
          }
        }
      }
    ]
  },
  {
    label: 'Reports',
    submenu: [
      {
         label: 'Read Instructions',
          click () {
            pdfWin = new PDFWindow({
              width: 800,
              height: 600
            });
            const path1 = __dirname + '/src/assets/doc/Instructions_Smithville_Full_Version_17ed.pdf';
            pdfWin.loadURL(path1);
            console.log('__dirname', path1);
          }
      },
      {
        label: 'Download PDF',
        click (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.send('download-pdf');
          }
        }
      }
    ]
  },
  {
    label: 'Updates',
    submenu: [
      {
        label: 'Check for Updates',
        visible: true,
        click (item, focusedWindow) {
          autoUpdater.checkForUpdates(item);
        }
      },
      {
        label: 'Restart to Update',
        visible: false,
        click (item, focusedWindow) {
          autoUpdater.quitAndInstall();
        }
      }
    ]
  }
];


try {
  require('dotenv').config();
} catch {
  console.log('asar');
}

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height
  });

  // and load the index.html of the app.
  if (serve) {
    require('electron-reload')(__dirname, {
    });
    win.loadURL('http://localhost:4200');
  } else {
  win.loadURL(url.format({
    protocol: 'file:',
    pathname: path.join(__dirname, 'dist/index.html'),
    slashes:  true
  }));
}

  // Open the DevTools.
  // if (serve) {
    win.webContents.openDevTools();
  // }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  win.on('close', (e) => {
    // const choice = dialog.showMessageBox(
    //   {
    //     type: 'question',
    //     buttons: ['Yes', 'No'],
    //     title: 'Confirm',
    //     message: 'Do you want to close without saving changes?',
    //     defaultId: 0
    //  });
    //  if (choice === 1) {
    //    e.preventDefault();
    //  }
  });

  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

/*********auto updater **************/


autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});

autoUpdater.on('update-available', (ev, info) => {
  sendStatusToWindow('Update available.');
  autoUpdater.downloadUpdate();
});

autoUpdater.on('update-not-available', (ev, info, item) => {
  sendStatusToWindow('Update not available.');
  dialog.showMessageBox({
    type: 'info',
    title: 'No Updates',
    message: 'Current version is up-to-date.'
  });
});

autoUpdater.on('error', (ev, err) => {
  sendStatusToWindow('Error in auto-updater.');
});


autoUpdater.on('download-progress', (progressObj) => {
  let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
  sendStatusToWindow(log_message);
});

autoUpdater.on('update-downloaded', (ev, info) => {
  sendStatusToWindow('Update downloaded.');

  dialog.showMessageBox({
      type: 'question',
      buttons: ['Install and Relaunch', 'Install Later'],
      defaultId: 0,
      message: 'A new version of ' + app.getName() + ' has been downloaded',
      detail: 'It will be installed the next time you restart the application'
    }, response => {
    if (response === 0) {
    setTimeout(() => {
      app.removeAllListeners('window-all-closed');
      app.removeAllListeners('close');
      autoUpdater.quitAndInstall();
    });
    } else {
      menu.items[3].submenu.items[0].visible = false;
      menu.items[3].submenu.items[1].visible = true;
    }
  });
});

function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
}

/***********************************/

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
   // autoUpdater.checkForUpdates();
    createWindow();
  //  updater.checkForUpdates();
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
