"use strict";
exports.__esModule = true;
var electron_updater_1 = require("electron-updater");
var AppUpdater = /** @class */ (function () {
    function AppUpdater() {
        var log = require('electron-log');
        log.transports.file.level = 'debug';
        electron_updater_1.autoUpdater.logger = log;
        electron_updater_1.autoUpdater.checkForUpdatesAndNotify();
    }
    return AppUpdater;
}());
exports["default"] = AppUpdater;
