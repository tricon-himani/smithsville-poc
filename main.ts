import { app, BrowserWindow, screen, Menu, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';
import electronSquirrel from 'electron-squirrel-startup';
import * as PDFWindow from 'electron-pdf-window';
const log = require('electron-log');
const { autoUpdater } = require('electron-updater');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

let win, serve, pdfWin;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

let updater;
autoUpdater.autoDownload = false;

autoUpdater.on('error', (error) => {
  dialog.showErrorBox('Error: ', error == null ? 'unknown' : (error.stack || error).toString());
});

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Found Updates',
    message: 'Found updates, do you want update now?',
    buttons: ['Sure', 'No']
  }, (buttonIndex) => {
    if (buttonIndex === 0) {
      autoUpdater.downloadUpdate();
    } else {
      updater.enabled = true;
      updater = null;
    }
  });
});

autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    title: 'No Updates',
    message: 'Current version is up-to-date.'
  });
  updater.enabled = true;
  updater = null;
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    title: 'Install Updates',
    message: 'Updates downloaded, application will be quit for update...'
  }, () => {
    setImmediate(() => autoUpdater.quitAndInstall());
  });
});

// export this to MenuItem click callback
function checkForUpdates (menuItem, focusedWindow, event) {
  updater = menuItem;
  updater.enabled = false;
  autoUpdater.checkForUpdates();
}

// autoUpdater.autoDownload = false;
// autoUpdater.on('checking-for-update', () => {
//   sendStatusToWindow('Checking for update...');
// });

// autoUpdater.on('update-available', (info) => {
//   sendStatusToWindow('Update available.');
// });

// autoUpdater.on('update-not-available', (info) => {
//   sendStatusToWindow('Update not available.');
// });

// autoUpdater.on('error', (err) => {
//   sendStatusToWindow('Error in auto-updater. ' + err);
// });

// autoUpdater.on('download-progress', (progressObj) => {
//   let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
//   log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
//   log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
//   sendStatusToWindow(log_message);
// });

// autoUpdater.on('update-downloaded', (info) => {
//   sendStatusToWindow('Update downloaded');
// });

// function sendStatusToWindow(text) {
//   log.info(text);
//   win.webContents.send('message', text);
// }

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
         label: 'PDF Preview',
          click () {
            pdfWin = new PDFWindow({
              width: 800,
              height: 600
            });

            pdfWin.loadURL('http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf');
          }
      },
      {
        label: 'Download PDF',
        click (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.send('download-pdf');
          }
        }
      },
      {
        label: 'Updates',
        click () {
         autoUpdater.checkForUpdates();
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
    const choice = dialog.showMessageBox(
      {
        type: 'question',
        buttons: ['Yes', 'No'],
        title: 'Confirm',
        message: 'Do you want to close without saving changes?',
        defaultId: 0
     });
     if (choice === 1) {
       e.preventDefault();
     }
  });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
  //  autoUpdater.checkForUpdates();
    // autoUpdater.checkForUpdates();
    createWindow();
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
