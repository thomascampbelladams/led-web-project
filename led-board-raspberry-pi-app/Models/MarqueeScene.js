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
var TextScene_1 = require("./TextScene");
var MarqueeScene = /** @class */ (function (_super) {
    __extends(MarqueeScene, _super);
    function MarqueeScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * async Render
     */
    MarqueeScene.prototype.Render = function (screen) {
        var fontName = this.Font.split('.')[0];
        screen.changeFont(fontName, this.Font);
        switch (this.Type) {
            case "horizontal marquee":
                screen.horizontalMarqueeText(this.Content, this.Color, this.AnimationDelay, false);
                break;
            case "vertical marquee":
                screen.verticalMarqueeText(this.Content, this.Color, this.AnimationDelay, false);
                break;
        }
    };
    return MarqueeScene;
}(TextScene_1["default"]));
exports["default"] = MarqueeScene;
