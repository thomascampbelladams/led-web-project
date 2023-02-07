var ElementHelper = /** @class */ (function () {
    function ElementHelper() {
    }
    ElementHelper.CreateLabel = function (labelText) {
        var ret = document.createElement('label');
        ret.innerText = labelText;
        return ret;
    };
    ElementHelper.CreateOption = function (valueStr, text) {
        var option = document.createElement("option");
        option.setAttribute("value", valueStr);
        option.innerText = text;
        return option;
    };
    ElementHelper.CreateNewScene = function (sceneName, screen) {
        switch (sceneName) {
            case "horizontal marquee":
                return new MarqueeScene(screen, true);
            case "vertical marquee":
                return new MarqueeScene(screen, false);
            case "animation":
                return new AnimationScene(screen);
            case "rainbow transition":
                return new RainbowTransitionScene(screen);
            case "text":
                return new TextScene(screen);
        }
    };
    ElementHelper.CombineIntoFormGroup = function (label, input) {
        var cont = document.createElement('div');
        cont.setAttribute('class', 'form-group');
        cont.appendChild(label);
        cont.appendChild(input);
        return cont;
    };
    ElementHelper.CreateRangeElement = function (min, max, onChange) {
        var ret = document.createElement('div');
        var numberShower = document.createElement('span');
        var input = document.createElement("input");
        input.setAttribute("type", "range");
        input.setAttribute("min", "" + min);
        input.setAttribute("max", "" + max);
        input.addEventListener("change", onChange);
        input.addEventListener("input", function (e) {
            numberShower.innerText = input.value;
        });
        numberShower.innerText = input.value;
        ret.appendChild(input);
        ret.appendChild(numberShower);
        return ret;
    };
    ElementHelper.CreateFontChooser = function (fonts, onChange) {
        var _this = this;
        var ret = document.createElement('div');
        var dropDown = document.createElement('select');
        var fontPreview = document.createElement('img');
        var imageDir = "/assets/rgb-screen-font-examples";
        var dropDownandPreviewCont = document.createElement('div');
        dropDownandPreviewCont.appendChild(dropDown);
        dropDownandPreviewCont.appendChild(fontPreview);
        dropDown.addEventListener("change", onChange);
        dropDown.addEventListener("change", function (e) {
            var fontFileName = dropDown.value + ".jpg";
            var animatedFontFileName = dropDown.value + ".gif";
            _this.CheckToSeeIfUrlResolves(imageDir + "/" + fontFileName).then(function () {
                fontPreview.setAttribute('src', location.protocol + "//" + location.host + imageDir + "/" + fontFileName);
            })["catch"](function () {
                fontPreview.setAttribute('src', location.protocol + "//" + location.host + imageDir + "/" + animatedFontFileName);
            });
        });
        this.CreateFontDropDown(fonts, dropDown);
        ret.appendChild(dropDownandPreviewCont);
        this.CheckToSeeIfUrlResolves(imageDir + "/" + fonts[0] + ".jpg").then(function () {
            fontPreview.setAttribute('src', location.protocol + "//" + location.host + imageDir + "/" + fonts[0] + ".jpg");
        })["catch"](function () {
            fontPreview.setAttribute('src', location.protocol + "//" + location.host + imageDir + "/" + fonts[0] + ".gif");
        });
        return ret;
    };
    ElementHelper.CheckToSeeIfUrlResolves = function (url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === this.DONE) {
                    this.status === 200 ? resolve() : reject();
                }
            };
            xhr.open('GET', url);
            xhr.send();
        });
    };
    ElementHelper.CreateFontDropDown = function (fonts, dropdown) {
        for (var i = 0, len = fonts.length; i < len; i++) {
            dropdown.appendChild(ElementHelper.CreateOption(fonts[i], fonts[i]));
        }
    };
    ElementHelper.CreateAnimationInput = function (onChange) {
        var animationInput = document.createElement("textarea");
        var animationExampleCont = document.createElement('div');
        var dancingSantaAnimation = document.createElement('a');
        var fireworkAnimation = document.createElement('a');
        var animationInputContainer = document.createElement('div');
        var animationErrorSpan = document.createElement('span');
        var validationErrorMessage = "Animation must be a 3D Array of color hex values: Each element of the array is a frame, where each frame is an array of pixel colors. Click the examples below to see an example input with image";
        dancingSantaAnimation.innerText = "Insert Dancing Santa Animation";
        dancingSantaAnimation.setAttribute("href", "#");
        dancingSantaAnimation.addEventListener("click", function (e) {
            var anim = Animations.DancingSantaAnimation();
            animationInput.value = JSON.stringify(anim);
            onChange(anim);
        });
        fireworkAnimation.innerText = "Insert Firework Animation";
        fireworkAnimation.setAttribute("href", "#");
        fireworkAnimation.addEventListener("click", function (e) {
            var anim = Animations.FireWorkAnimation();
            animationInput.value = JSON.stringify(anim);
            onChange(anim);
        });
        animationInput.addEventListener("change", function (e) {
            animationErrorSpan.innerText = "";
            try {
                var contentInput = JSON.parse(animationInput.value);
                if (contentInput.length) {
                    onChange(contentInput);
                }
                else {
                    animationErrorSpan.innerText = validationErrorMessage;
                }
            }
            catch (e) {
                animationErrorSpan.innerText = validationErrorMessage;
            }
        });
        animationErrorSpan.setAttribute('class', 'animation-validation');
        animationExampleCont.setAttribute('class', 'animation-examples');
        animationExampleCont.appendChild(dancingSantaAnimation);
        animationExampleCont.appendChild(fireworkAnimation);
        animationInputContainer.setAttribute('class', 'animation-input');
        animationInputContainer.appendChild(animationInput);
        animationInputContainer.appendChild(animationExampleCont);
        animationInputContainer.appendChild(animationErrorSpan);
        return animationInputContainer;
    };
    return ElementHelper;
}());
