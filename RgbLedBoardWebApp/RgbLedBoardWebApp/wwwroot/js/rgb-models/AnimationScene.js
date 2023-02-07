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
var AnimationScene = /** @class */ (function (_super) {
    __extends(AnimationScene, _super);
    function AnimationScene(screen) {
        var _this = _super.call(this, "", screen) || this;
        _this.MaxAnimationDelay = 100;
        _this.MinAnimationDelay = 0;
        _this.MaxNumberOfTimesToRepeat = 3;
        _this.MinNumberOfTimesToRepeat = 1;
        _this.Type = "animation";
        _this.ContentTextBox = ElementHelper.CreateAnimationInput(function (content) {
            _this.Content = content;
        });
        _this.ContentLabel = ElementHelper.CreateLabel("Content");
        _this.AnimationDelayTextBox = ElementHelper.CreateRangeElement(_this.MinAnimationDelay, _this.MaxAnimationDelay, function (e) {
            _this.AnimationDelay = parseInt(_this.NumberOfTimesToRepeatTextBox.querySelector('input').value);
        });
        _this.AnimationDelayLabel = ElementHelper.CreateLabel("Animation Delay");
        _this.NumberOfTimesToRepeatTextBox = ElementHelper.CreateRangeElement(_this.MinNumberOfTimesToRepeat, _this.MaxNumberOfTimesToRepeat, function (e) {
            _this.NumberOfTimesToRepeat = parseInt(_this.NumberOfTimesToRepeatTextBox.querySelector('input').value);
        });
        _this.NumberOfTimesToRepeatLabel = ElementHelper.CreateLabel("Number of times to repeat");
        _this.SceneToShowInBackgroundDropDown = document.createElement("select");
        _this.SceneToShowInBackgroundForm = document.createElement("div");
        _this.CreateTypeDropDownOptions(_this.SceneToShowInBackgroundDropDown);
        _this.SceneToShowInBackgroundDropDown.addEventListener("change", function (e) {
            _this.SceneToShowInBackgroundForm.innerHTML = "";
            if (_this.SceneToShowInBackgroundDropDown.value !== "none") {
                _this.SceneToShowInBackground = ElementHelper.CreateNewScene(_this.SceneToShowInBackgroundDropDown.value, _this.SceneToShowInBackgroundForm);
                _this.SceneToShowInBackground.Render();
            }
        });
        _this.SceneToShowInBackgroundLabel = ElementHelper.CreateLabel("Scene to show in Background");
        _this.isTwoBitAnimationCheckBox = document.createElement("input");
        _this.isTwoBitAnimationCheckBox.setAttribute("type", "checkbox");
        _this.isTwoBitAnimationCheckBox.addEventListener("change", function (e) {
            _this.isTwoBitAnimation = _this.isTwoBitAnimationCheckBox.checked;
        });
        _this.isTwoBitAnimationLabel = ElementHelper.CreateLabel("Is two bit animation?");
        return _this;
    }
    /**
     * Render
     */
    AnimationScene.prototype.Render = function () {
        _super.prototype.Render.call(this);
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.ContentLabel, this.ContentTextBox));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.AnimationDelayLabel, this.AnimationDelayTextBox));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.NumberOfTimesToRepeatLabel, this.NumberOfTimesToRepeatTextBox));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.SceneToShowInBackgroundLabel, this.SceneToShowInBackgroundDropDown));
        this.screen.appendChild(this.SceneToShowInBackgroundForm);
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.isTwoBitAnimationLabel, this.isTwoBitAnimationCheckBox));
    };
    AnimationScene.prototype.ToJson = function () {
        var ret = _super.prototype.ToJson.call(this);
        ret["Content"] = this.Content;
        ret["AnimationDelay"] = parseInt(this.AnimationDelayTextBox.querySelector("input").value);
        ret["NumberOfTimesToRepeat"] = parseInt(this.NumberOfTimesToRepeatTextBox.querySelector("input").value);
        ret["SceneToShowInBackground"] = this.SceneToShowInBackgroundDropDown.value !== "none" ? this.SceneToShowInBackground.ToJson() : {};
        ret["isTwoBitAnimation"] = this.isTwoBitAnimationCheckBox.checked;
        return ret;
    };
    return AnimationScene;
}(Scene));
