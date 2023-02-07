"use strict";
exports.__esModule = true;
var LogHelper = /** @class */ (function () {
    function LogHelper(isDebug) {
        this.isDebug = isDebug;
        this.logMessage = "";
        this.timeOutHandle = {};
    }
    LogHelper.prototype.LogString = function (message) {
        var _this = this;
        if (this.isDebug) {
            this.logMessage = "\n" + this.logMessage + "\n" + message;
            if (this.timeOutHandle)
                clearTimeout(this.timeOutHandle);
            this.timeOutHandle = global.setTimeout(function () {
                console.log(_this.logMessage);
                _this.logMessage = "";
                _this.timeOutHandle = null;
            }, 1);
        }
    };
    LogHelper.prototype.SetDebugFlag = function (debug) {
        this.isDebug = debug;
    };
    LogHelper.prototype.GetDebugFlag = function () {
        return this.isDebug;
    };
    return LogHelper;
}());
exports["default"] = LogHelper;
