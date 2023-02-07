interface ISceneEventCallback {
    (scene: Scene): void;
}

class Scene {
    public Type: string;
    public IndexValue: number;
    private OnDropDownChange: ISceneEventCallback;
    private TypeField: HTMLSelectElement;
    private TypeLabel: HTMLLabelElement;
    private Types = [
        "none",
        "horizontal marquee",
        "vertical marquee",
        "animation",
        "rainbow transition",
        "text"
    ];
    public screen: HTMLElement;

    constructor(jsonObj, screen: HTMLElement) {
        if (jsonObj) {
            for (const prop in jsonObj) {
                this[prop] = jsonObj[prop];
            }
        }

        this.TypeField = document.createElement("select");
        this.TypeLabel = ElementHelper.CreateLabel('Scene Type');
        this.screen = document.createElement("div");
        screen.appendChild(this.screen);

        this.screen.setAttribute('class', 'scene-group');
    }

    public CreateTypeDropDownOptions(dropdown: HTMLSelectElement) {
        for (let i = 0, len = this.Types.length; i < len; i++) {
            dropdown.appendChild(ElementHelper.CreateOption(this.Types[i], this.Types[i]));
        }
    }

    public BindToOnDropDownChange(event: ISceneEventCallback) {
        this.OnDropDownChange = event;
    }

    /**
     * Render
     */
    public Render() {
        this.CreateTypeDropDownOptions(this.TypeField);

        this.TypeField.addEventListener("change", (e) => {
            this.Type = this.TypeField.value;

            this.OnDropDownChange(this);
        });

        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.TypeLabel, this.TypeField));

        if (this.Type) {
            this.TypeField.value = this.Type;
        }
    }

    public Dispose() {
        this.screen.parentElement.removeChild(this.screen);
    }

    public ToJson() {
        return {
            "Type": this.Type
        };
    }
}