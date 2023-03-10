"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Scene_1 = require("./Scene");
var AnimationScene = /** @class */ (function (_super) {
    __extends(AnimationScene, _super);
    function AnimationScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render
     */
    AnimationScene.prototype.Render = function (screen, IsBackgroundScene) {
        if (IsBackgroundScene === void 0) { IsBackgroundScene = false; }
        var backgroundScene = (this.SceneToShowInBackground) ? screen.TranslateScene(this.SceneToShowInBackground) : null;
        screen.doAnimation(this.Content, this.AnimationDelay, this.NumberOfTimesToRepeat, function () {
            if (backgroundScene) {
                backgroundScene.Render(screen, true);
            }
        }, this.isTwoBitAnimation);
    };
    return AnimationScene;
}(Scene_1["default"]));
exports["default"] = AnimationScene;
