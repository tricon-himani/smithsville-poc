/**
 * updater.js
 *
 * Please use manual update only when it is really required, otherwise please use recommended non-intrusive auto update.
 *
 * Import steps:
 * 1. create `updater.js` for the code snippet
 * 2. require `updater.js` for menu implementation, and set `checkForUpdates` callback from `updater` for the click property of `Check Updates...` MenuItem.
 */
const { app, dialog } = require('electron')
const { autoUpdater } = require('electron-updater')
const log = require('electron-log')

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

let updater
autoUpdater.autoDownload = false


autoUpdater.on('error', (error) => {
  dialog.showErrorBox('Error: ', error == null ? "unknown" : (error.stack || error).toString())
})

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Found Updates',
    message: 'Found updates, do you want update now?',
    buttons: ['Sure', 'No']
  }, (buttonIndex) => {
    if (buttonIndex === 0) {
      autoUpdater.downloadUpdate()
    }
    else {
      if (updater != undefined) {
        updater.enabled = true
        updater = null
      }
    }
  })
})

autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    title: 'No Updates',
    message: 'Current version is up-to-date.'
  })
  if (updater != undefined) {
    updater.enabled = true
    updater = null
  }  
})

autoUpdater.on('download-progress', (e, progress) => {
  log.info('Download progress', progress.percent);
})

autoUpdater.on('update-downloaded', () => {
  const options = {
    type: 'info',
    buttons: ['Update Now'],
    defaultId: 0,
    noLink: true,
    title: 'Install Updates',
    message: 'A new version is ready to install.',
    detail: 'The update will proceed once you click Update Now.'
  };
  const callback = (buttonIndex) => {
    if (buttonIndex === 0) {
   // autoUpdater.quitAndInstall();
      app.removeAllListeners("close")   
      setImmediate(() => {
        autoUpdater.quitAndInstall(false)
      }, 5000)
    }
  };
  dialog.showMessageBox(null, options, callback);
})

// export this to MenuItem click callback
function checkForUpdates (menuItem, focusedWindow, event) {
  if (menuItem) {
    updater = menuItem
    updater.enabled = false
  }  
  autoUpdater.checkForUpdates()
}
module.exports.checkForUpdates = checkForUpdates