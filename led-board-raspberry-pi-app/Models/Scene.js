"use strict";
exports.__esModule = true;
var Scene = /** @class */ (function () {
    function Scene(jsonObj, logger) {
        for (var prop in jsonObj) {
            this[prop] = jsonObj[prop];
        }
        this.logger = logger;
    }
    /**
     * Render
     */
    Scene.prototype.Render = function (screen, IsBackgroundScene) {
        if (IsBackgroundScene === void 0) { IsBackgroundScene = false; }
    };
    return Scene;
}());
exports["default"] = Scene;
