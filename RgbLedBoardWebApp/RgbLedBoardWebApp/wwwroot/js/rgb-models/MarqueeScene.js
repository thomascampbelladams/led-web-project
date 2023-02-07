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
var MarqueeScene = /** @class */ (function (_super) {
    __extends(MarqueeScene, _super);
    function MarqueeScene(screen, isHorizontal) {
        var _this = _super.call(this, screen) || this;
        _this.MaxDelay = 100;
        _this.MinDelay = 0;
        _this.Type = (isHorizontal) ? "horizontal marquee" : "vertical marquee";
        _this.AnimationDelayRangeElement = ElementHelper.CreateRangeElement(_this.MinDelay, _this.MaxDelay, function (e) {
            _this.AnimationDelay = parseInt(_this.AnimationDelayRangeElement.querySelector('input').value);
        });
        _this.AnimationDelayLabel = ElementHelper.CreateLabel("Animation Delay");
        return _this;
    }
    /**
     * async Render
     */
    MarqueeScene.prototype.Render = function () {
        _super.prototype.Render.call(this);
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.AnimationDelayLabel, this.AnimationDelayRangeElement));
    };
    MarqueeScene.prototype.ToJson = function () {
        var ret = _super.prototype.ToJson.call(this);
        ret["AnimationDelay"] = parseInt(this.AnimationDelayRangeElement.querySelector('input').value);
        return ret;
    };
    return MarqueeScene;
}(TextScene));
