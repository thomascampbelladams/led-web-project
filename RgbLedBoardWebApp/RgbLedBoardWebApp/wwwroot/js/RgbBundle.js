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
        _this.ContentTextBox = document.createElement("textarea");
        _this.ContentTextBox.addEventListener("change", function (e) {
            _this.Content = _this.ContentTextBox.value;
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
            if (_this.SceneToShowInBackgroundDropDown.value === "none") {
                _this.SceneToShowInBackgroundForm.innerHTML = "";
            }
            else {
                _this.SceneToShowInBackground = ElementHelper.CreateNewScene(_this.SceneToShowInBackgroundDropDown.value, _this.screen);
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
        ret["Content"] = this.ContentTextBox.value;
        ret["AnimationDelay"] = parseInt(this.AnimationDelayTextBox.querySelector("input").value);
        ret["NumberOfTimesToRepeat"] = this.NumberOfTimesToRepeatTextBox.querySelector("input").value;
        ret["SceneToShowInBackground"] = this.SceneToShowInBackground.ToJson();
        ret["isTwoBitAnimation"] = this.isTwoBitAnimationCheckBox.checked;
        return ret;
    };
    return AnimationScene;
}(Scene));

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
        ret["BlockHeight"] = this.BlockHeightRangeElement.querySelector('input').value;
        ret["BlockWidth"] = this.BlockWidthRangeElement.querySelector('input').value;
        return ret;
    };
    return RainbowTransitionScene;
}(AnimationScene));

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

var SceneList = /** @class */ (function () {
    function SceneList(jsonStr, screen) {
        this.i = 0;
        this.TheScreen = screen;
        this.TimesToRepeat = 1;
        this.Scenes = [];
    }
    SceneList.prototype.AddScene = function (sceneToAdd) {
        this.Scenes[this.i] = sceneToAdd;
        sceneToAdd.IndexValue = this.i;
        this.RenderScene(sceneToAdd);
        sceneToAdd.BindToOnDropDownChange(this.OnSceneChange.bind(this));
        this.i++;
    };
    SceneList.prototype.OnSceneChange = function (scene) {
        var newScene = ElementHelper.CreateNewScene(scene.Type, this.TheScreen);
        this.Scenes[scene.IndexValue] = newScene;
        newScene.IndexValue = scene.IndexValue;
        newScene.BindToOnDropDownChange(this.OnSceneChange.bind(this));
        scene.Dispose();
        newScene.Render();
    };
    /**
     * Render
     */
    SceneList.prototype.Render = function () {
        for (var index = 0; index < this.Scenes.length; index++) {
            var scene = this.Scenes[index];
            this.RenderScene(scene);
        }
    };
    SceneList.prototype.RenderScene = function (scene) {
        scene.Render();
    };
    SceneList.prototype.ToJson = function () {
        var jsonObjs = [];
        for (var i = 0, len = this.Scenes.length; i < len; i++) {
            jsonObjs[i] = this.Scenes[i].ToJson();
        }
        return {
            "Scenes": jsonObjs,
            "TimeToRepeat": this.TimesToRepeat
        };
    };
    return SceneList;
}());

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
        _this.FontDropDown = document.createElement("select");
        _this.CreateFontDropDown(_this.FontDropDown);
        _this.FontDropDown.addEventListener("change", function (e) {
            _this.Font = _this.FontDropDown.value;
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
        return _this;
    }
    TextScene.prototype.CreateFontDropDown = function (dropdown) {
        for (var i = 0, len = this.availableFonts.length; i < len; i++) {
            dropdown.appendChild(ElementHelper.CreateOption(this.availableFonts[i], this.availableFonts[i]));
        }
    };
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
    };
    TextScene.prototype.ToJson = function () {
        var ret = _super.prototype.ToJson.call(this);
        ret["Content"] = this.ContentInput.value;
        ret["Color"] = parseInt(this.ColorInput.value.split("#")[1], 16);
        ret["CenteredVertically"] = this.CenteredVerticallyCheckbox.checked;
        ret["CenteredHorizontally"] = this.CenteredHorizontallyCheckbox.checked;
        return ret;
    };
    return TextScene;
}(Scene));

var RgbScreenForm = /** @class */ (function () {
    function RgbScreenForm(screen) {
        var _this = this;
        this.SceneList = new SceneList("", screen);
        this.SceneList.AddScene(new Scene("", screen));
        this.AddButton = document.createElement("button");
        this.AddButton.innerText = "Add Scene +";
        this.AddButton.addEventListener("click", function (e) {
            _this.SceneList.AddScene(new Scene("", screen));
        });
        screen.appendChild(this.AddButton);
        this.SubmitButton = document.createElement("button");
        this.SubmitButton.innerText = "Submit";
        this.SubmitButton.addEventListener("click", function (e) {
            console.log(_this.SceneList.ToJson());
        });
        screen.appendChild(this.SubmitButton);
    }
    return RgbScreenForm;
}());
var screenElem = document.createElement("div");
screenElem.setAttribute('id', "the-screen");
document.body.appendChild(screenElem);
new RgbScreenForm(screenElem);