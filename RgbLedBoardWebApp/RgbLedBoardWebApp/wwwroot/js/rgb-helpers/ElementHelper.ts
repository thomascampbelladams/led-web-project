class ElementHelper {
    public static CreateLabel(labelText: string): HTMLLabelElement {
        const ret = document.createElement('label');

        ret.innerText = labelText;

        return ret;
    }

    public static CreateOption(valueStr: string, text: string): HTMLOptionElement {
        const option = document.createElement("option");

        option.setAttribute("value", valueStr);
        option.innerText = text;

        return option;
    }

    public static CreateNewScene(sceneName: string, screen: HTMLElement) {
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
    }

    public static CombineIntoFormGroup(label: HTMLLabelElement, input: HTMLElement): HTMLElement {
        const cont = document.createElement('div');

        cont.setAttribute('class', 'form-group');
        cont.appendChild(label);
        cont.appendChild(input);

        return cont;
    }

    public static CreateRangeElement(min: number, max: number, onChange): HTMLElement {
        const ret = document.createElement('div');
        const numberShower = document.createElement('span');
        const input = document.createElement("input");

        input.setAttribute("type", "range");
        input.setAttribute("min", `${min}`);
        input.setAttribute("max", `${max}`);
        input.addEventListener("change", onChange);
        input.addEventListener("input", (e) => {
            numberShower.innerText = input.value;
        });

        numberShower.innerText = input.value;

        ret.appendChild(input);
        ret.appendChild(numberShower);

        return ret;
    }

    public static CreateFontChooser(fonts: string[], onChange): HTMLElement {
        const ret = document.createElement('div');
        const dropDown: HTMLSelectElement = document.createElement('select');
        const fontPreview: HTMLImageElement = document.createElement('img');
        const imageDir = "/assets/rgb-screen-font-examples";
        const dropDownandPreviewCont = document.createElement('div');

        dropDownandPreviewCont.appendChild(dropDown);
        dropDownandPreviewCont.appendChild(fontPreview);

        dropDown.addEventListener("change", onChange);
        dropDown.addEventListener("change", (e) => {
            const fontFileName = `${dropDown.value}.jpg`;
            const animatedFontFileName = `${dropDown.value}.gif`;

            this.CheckToSeeIfUrlResolves(`${imageDir}/${fontFileName}`).then(() => {
                fontPreview.setAttribute('src', `${location.protocol}//${location.host}${imageDir}/${fontFileName}`);
            }).catch(() => {
                fontPreview.setAttribute('src', `${location.protocol}//${location.host}${imageDir}/${animatedFontFileName}`);
            });
        });
        this.CreateFontDropDown(fonts, dropDown);

        ret.appendChild(dropDownandPreviewCont);

        this.CheckToSeeIfUrlResolves(`${imageDir}/${fonts[0]}.jpg`).then(() => {
            fontPreview.setAttribute('src', `${location.protocol}//${location.host}${imageDir}/${fonts[0]}.jpg`);
        }).catch(() => {
            fontPreview.setAttribute('src', `${location.protocol}//${location.host}${imageDir}/${fonts[0]}.gif`);
        });

        return ret;
    }

    public static CheckToSeeIfUrlResolves(url: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (this.readyState === this.DONE) {
                    this.status === 200 ? resolve() : reject();
                }
            };
            xhr.open('GET', url);
            xhr.send();
        });
    }

    public static CreateFontDropDown(fonts: string[], dropdown: HTMLElement) {
        for (let i = 0, len = fonts.length; i < len; i++) {
            dropdown.appendChild(ElementHelper.CreateOption(fonts[i], fonts[i]));
        }
    }

    public static CreateAnimationInput(onChange): HTMLElement {
        const animationInput: HTMLTextAreaElement = document.createElement("textarea");
        const animationExampleCont: HTMLElement = document.createElement('div');
        const dancingSantaAnimation: HTMLAnchorElement = document.createElement('a');
        const fireworkAnimation: HTMLAnchorElement = document.createElement('a');
        const animationInputContainer: HTMLElement = document.createElement('div');
        const animationErrorSpan: HTMLSpanElement = document.createElement('span');
        const validationErrorMessage = "Animation must be a 3D Array of color hex values: Each element of the array is a frame, where each frame is an array of pixel colors. Click the examples below to see an example input with image";

        dancingSantaAnimation.innerText = "Insert Dancing Santa Animation";
        dancingSantaAnimation.setAttribute("href", "#");
        dancingSantaAnimation.addEventListener("click", (e) => {
            const anim = Animations.DancingSantaAnimation();
            animationInput.value = JSON.stringify(anim);
            onChange(anim);
        });

        fireworkAnimation.innerText = "Insert Firework Animation";
        fireworkAnimation.setAttribute("href", "#");
        fireworkAnimation.addEventListener("click", (e) => {
            const anim = Animations.FireWorkAnimation();
            animationInput.value = JSON.stringify(anim);
            onChange(anim);
        });

        animationInput.addEventListener("change", (e) => {
            animationErrorSpan.innerText = "";

            try {
                const contentInput = JSON.parse(animationInput.value);

                if ((contentInput as number[][][]).length) {
                    onChange(contentInput);
                } else {
                    animationErrorSpan.innerText = validationErrorMessage;
                }
            } catch (e) {
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
    }
}