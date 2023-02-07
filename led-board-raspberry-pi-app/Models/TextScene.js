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
var TextScene = /** @class */ (function (_super) {
    __extends(TextScene, _super);
    function TextScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render
     */
    TextScene.prototype.Render = function (screen, IsBackgroundScene) {
        if (IsBackgroundScene === void 0) { IsBackgroundScene = false; }
        var fontName = this.Font.split('.')[0];
        screen.changeFont(fontName, this.Font);
        if (this.CenteredHorizontally && this.CenteredVertically) {
            screen.drawCenteredText(this.Content, this.Color, !IsBackgroundScene);
            if (!IsBackgroundScene)
                screen.clearDisplay(this.NumberOfSecondsToShow);
        }
        else if (this.CenteredVertically) {
            screen.drawVerticallyCenteredText(this.Content, this.Color, !IsBackgroundScene);
            if (!IsBackgroundScene)
                screen.clearDisplay(this.NumberOfSecondsToShow);
        }
        else if (this.CenteredHorizontally) {
            screen.drawHorizCenteredText(this.Content, this.Color, !IsBackgroundScene);
            if (!IsBackgroundScene)
                screen.clearDisplay(this.NumberOfSecondsToShow);
        }
        else {
            screen.drawCenteredText(this.Content, this.Color, !IsBackgroundScene);
            if (!IsBackgroundScene)
                screen.clearDisplay(this.NumberOfSecondsToShow);
        }
    };
    return TextScene;
}(Scene_1["default"]));
exports["default"] = TextScene;
