import { app, BrowserWindow, screen, Menu, dialog, ipcRenderer, ipcMain  } from 'electron';
import * as path from 'path';
import * as url from 'url';
import electronSquirrel from 'electron-squirrel-startup';
import * as PDFWindow from 'electron-pdf-window';
import * as updater from './updater';

let win, serve, pdfWin;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

ipcMain.on('save-file', (event, arg) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>', arg);
});

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
      }
    ]
  },
  {
    label: 'Updates',
    submenu: [
      {
        label: 'check for Updates',
        click (item, focusedWindow) {
          updater.checkForUpdates(item, focusedWindow);
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

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
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
