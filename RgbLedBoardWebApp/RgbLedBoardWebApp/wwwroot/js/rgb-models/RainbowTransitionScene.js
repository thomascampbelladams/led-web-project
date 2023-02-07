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
var RainbowTransitionScene = /** @class */ (function (_super) {
    __extends(RainbowTransitionScene, _super);
    function RainbowTransitionScene(screen) {
        var _this = _super.call(this, screen) || this;
        _this.BlockHeightMax = 10;
        _this.BlockHeightMin = 1;
        _this.BlockWidthMax = 10;
        _this.BlockWidthMin = 1;
        _this.Type = "rainbow transition";
        _this.BlockHeightRangeElement = ElementHelper.CreateRangeElement(_this.BlockHeightMin, _this.BlockHeightMax, function (e) {
            _this.BlockHeight = parseInt(_this.BlockHeightRangeElement.querySelector('input').value);
        });
        _this.BlockHeightLabel = ElementHelper.CreateLabel("Color block height (in pixels)");
        _this.BlockWidthRangeElement = ElementHelper.CreateRangeElement(_this.BlockWidthMin, _this.BlockWidthMax, function (e) {
            _this.BlockWidth = parseInt(_this.BlockWidthRangeElement.querySelector('input').value);
        });
        _this.BlockWidthLabel = ElementHelper.CreateLabel("Color block width (in pixels)");
        return _this;
    }
    /**
     * Render
     */
    RainbowTransitionScene.prototype.Render = function () {
        _super.prototype.Render.call(this);
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.BlockHeightLabel, this.BlockHeightRangeElement));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.BlockWidthLabel, this.BlockWidthRangeElement));
    };
    RainbowTransitionScene.prototype.ToJson = function () {
        var ret = _super.prototype.ToJson.call(this);
        ret["BlockHeight"] = parseInt(this.BlockHeightRangeElement.querySelector('input').value);
        ret["BlockWidth"] = parseInt(this.BlockWidthRangeElement.querySelector('input').value);
        return ret;
    };
    return RainbowTransitionScene;
}(AnimationScene));
