var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './app-builds/win-unpacked',
    outputDirectory: './app-builds/installer',
    version: '1.0.0',
    authors: 'Me',
    exe: 'AngularElectron.exe'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));