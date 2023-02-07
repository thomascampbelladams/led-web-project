var Scene = /** @class */ (function () {
    function Scene(jsonObj, screen) {
        this.Types = [
            "none",
            "horizontal marquee",
            "vertical marquee",
            "animation",
            "rainbow transition",
            "text"
        ];
        if (jsonObj) {
            for (var prop in jsonObj) {
                this[prop] = jsonObj[prop];
            }
        }
        this.TypeField = document.createElement("select");
        this.TypeLabel = ElementHelper.CreateLabel('Scene Type');
        this.screen = document.createElement("div");
        screen.appendChild(this.screen);
        this.screen.setAttribute('class', 'scene-group');
    }
    Scene.prototype.CreateTypeDropDownOptions = function (dropdown) {
        for (var i = 0, len = this.Types.length; i < len; i++) {
            dropdown.appendChild(ElementHelper.CreateOption(this.Types[i], this.Types[i]));
        }
    };
    Scene.prototype.BindToOnDropDownChange = function (event) {
        this.OnDropDownChange = event;
    };
    /**
     * Render
     */
    Scene.prototype.Render = function () {
        var _this = this;
        this.CreateTypeDropDownOptions(this.TypeField);
        this.TypeField.addEventListener("change", function (e) {
            _this.Type = _this.TypeField.value;
            _this.OnDropDownChange(_this);
        });
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.TypeLabel, this.TypeField));
        if (this.Type) {
            this.TypeField.value = this.Type;
        }
    };
    Scene.prototype.Dispose = function () {
        this.screen.parentElement.removeChild(this.screen);
    };
    Scene.prototype.ToJson = function () {
        return {
            "Type": this.Type
        };
    };
    return Scene;
}());
