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
var TextScene = /** @class */ (function (_super) {
    __extends(TextScene, _super);
    function TextScene(screen) {
        var _this = _super.call(this, "", screen) || this;
        _this.NumberOfSecondsToShowMin = 2;
        _this.NumberOfSecondsToShowMax = 15;
        _this.availableFonts = [
            "10x20",
            "4x6",
            "5x7",
            "5x8",
            "6x10",
            "6x12",
            "6x13",
            "6x13B",
            "6x13O",
            "6x9",
            "7x13",
            "7x13B",
            "7x13O",
            "7x14",
            "7x14B",
            "8x13",
            "8x13B",
            "8x13O",
            "9x15",
            "9x15B",
            "9x18",
            "9x18B",
            "clR6x12",
            "creep",
            "HaxorMedium-10",
            "HaxorMedium-11",
            "HaxorMedium-12",
            "HaxorMedium-13",
            "HaxorNarrow-15",
            "HaxorNarrow-16",
            "HaxorNarrow-17",
            "helvR12",
            "knxt",
            "logisoso46",
            "peep-10x20",
            "PsevdoAzbukaMedium-12",
            "scientifica-11",
            "scientificaBold-11",
            "scientificaItalic-11",
            "spleen-12x24",
            "spleen-16x32",
            "spleen-32x64",
            "spleen-5x8",
            "spleen-8x16",
            "tom-thumb"
        ];
        _this.Type = "text";
        _this.ContentInput = document.createElement("input");
        _this.ContentInput.setAttribute("type", "text");
        _this.ContentInput.addEventListener("change", function (e) {
            _this.Content = _this.ContentInput.value;
        });
        _this.ContentLabel = ElementHelper.CreateLabel("Content");
        _this.ColorInput = document.createElement("input");
        _this.ColorInput.setAttribute("type", "color");
        _this.ColorInput.addEventListener("change", function (e) {
            _this.Color = parseInt(_this.ColorInput.value);
        });
        _this.ColorLabel = ElementHelper.CreateLabel("Color of text");
        _this.FontDropDown = ElementHelper.CreateFontChooser(_this.availableFonts, function (e) {
            _this.Font = _this.FontDropDown.querySelector('select').value;
        });
        _this.FontLabel = ElementHelper.CreateLabel("Font");
        _this.CenteredVerticallyCheckbox = document.createElement("input");
        _this.CenteredVerticallyCheckbox.setAttribute("type", "checkbox");
        _this.CenteredVerticallyCheckbox.addEventListener("change", function (e) {
            _this.CenteredVertically = _this.CenteredVerticallyCheckbox.checked;
        });
        _this.CenteredVerticallyLabel = ElementHelper.CreateLabel("Centered Vertically?");
        _this.CenteredHorizontallyCheckbox = document.createElement("input");
        _this.CenteredHorizontallyCheckbox.setAttribute("type", "checkbox");
        _this.CenteredHorizontallyCheckbox.addEventListener("change", function (e) {
            _this.CenteredHorizontally = _this.CenteredHorizontallyCheckbox.checked;
        });
        _this.CenteredHorizontallyLabel = ElementHelper.CreateLabel("Centered Horizontally?");
        _this.NumberOfSecondsToShowElement = ElementHelper.CreateRangeElement(_this.NumberOfSecondsToShowMin, _this.NumberOfSecondsToShowMax, function (e) {
            _this.NumberOfSecondsToShow = parseInt(_this.NumberOfSecondsToShowElement.querySelector('input').value);
        });
        _this.NumberOfSecondsToShowLabel = ElementHelper.CreateLabel("Number of Seconds To Show");
        return _this;
    }
    /**
     * Render
     */
    TextScene.prototype.Render = function () {
        _super.prototype.Render.call(this);
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.ContentLabel, this.ContentInput));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.ColorLabel, this.ColorInput));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.FontLabel, this.FontDropDown));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.CenteredHorizontallyLabel, this.CenteredHorizontallyCheckbox));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.CenteredVerticallyLabel, this.CenteredVerticallyCheckbox));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.NumberOfSecondsToShowLabel, this.NumberOfSecondsToShowElement));
    };
    TextScene.prototype.ToJson = function () {
        var ret = _super.prototype.ToJson.call(this);
        ret["Content"] = this.ContentInput.value;
        ret["Color"] = parseInt(this.ColorInput.value.split("#")[1], 16);
        ret["CenteredVertically"] = this.CenteredVerticallyCheckbox.checked;
        ret["CenteredHorizontally"] = this.CenteredHorizontallyCheckbox.checked;
        ret["Font"] = this.FontDropDown.querySelector('select').value + ".bdf";
        ret["NumberOfSecondsToShow"] = parseInt(this.NumberOfSecondsToShowElement.querySelector('input').value);
        return ret;
    };
    return TextScene;
}(Scene));
