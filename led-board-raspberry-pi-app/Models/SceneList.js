"use strict";
exports.__esModule = true;
var SceneList = /** @class */ (function () {
    function SceneList(jsonStr, screen, logger) {
        var _this = this;
        var jsonObj = JSON.parse(jsonStr);
        var i = 0;
        this.TheScreen = screen;
        this.TimesToRepeat = jsonObj["TimesToRepeat"];
        this.Scenes = [];
        jsonObj["Scenes"].forEach(function (obj) {
            _this.Scenes[i] = _this.TheScreen.TranslateScene(obj);
            i++;
        });
        this.logger = logger;
    }
    /**
     * Render
     */
    SceneList.prototype.Render = function () {
        for (var index = 0; index < this.Scenes.length; index++) {
            var scene = this.Scenes[index];
            scene.Render(this.TheScreen);
        }
        this.TheScreen.runQueue();
    };
    return SceneList;
}());
exports["default"] = SceneList;
