class AnimationScene extends Scene {
    public Content: number[][][];
    private ContentTextBox: HTMLElement;
    private ContentLabel: HTMLLabelElement;
    public AnimationDelay: number;
    private AnimationDelayTextBox: HTMLElement;
    private MaxAnimationDelay = 100;
    private MinAnimationDelay = 0;
    private AnimationDelayLabel: HTMLLabelElement;
    public NumberOfTimesToRepeat: number;
    private NumberOfTimesToRepeatTextBox: HTMLElement;
    private MaxNumberOfTimesToRepeat = 3;
    private MinNumberOfTimesToRepeat = 1;
    private NumberOfTimesToRepeatLabel: HTMLLabelElement;
    public SceneToShowInBackground: Scene;
    private SceneToShowInBackgroundDropDown: HTMLSelectElement;
    private SceneToShowInBackgroundForm: HTMLElement;
    private SceneToShowInBackgroundLabel: HTMLLabelElement;
    public isTwoBitAnimation: boolean;
    private isTwoBitAnimationCheckBox: HTMLInputElement;
    private isTwoBitAnimationLabel: HTMLLabelElement;

    constructor(screen: HTMLElement) {
        super("", screen);

        this.Type = "animation";

        this.ContentTextBox = ElementHelper.CreateAnimationInput((content: number[][][]) => {
            this.Content = content;
        });
        this.ContentLabel = ElementHelper.CreateLabel(`Content`);

        this.AnimationDelayTextBox = ElementHelper.CreateRangeElement(this.MinAnimationDelay, this.MaxAnimationDelay, (e) => {
            this.AnimationDelay = parseInt(this.NumberOfTimesToRepeatTextBox.querySelector('input').value);
        });
        this.AnimationDelayLabel = ElementHelper.CreateLabel("Animation Delay");

        this.NumberOfTimesToRepeatTextBox = ElementHelper.CreateRangeElement(this.MinNumberOfTimesToRepeat, this.MaxNumberOfTimesToRepeat, (e) => {
            this.NumberOfTimesToRepeat = parseInt(this.NumberOfTimesToRepeatTextBox.querySelector('input').value);
        });
        this.NumberOfTimesToRepeatLabel = ElementHelper.CreateLabel("Number of times to repeat");

        this.SceneToShowInBackgroundDropDown = document.createElement("select");
        this.SceneToShowInBackgroundForm = document.createElement("div");
        this.CreateTypeDropDownOptions(this.SceneToShowInBackgroundDropDown);
        this.SceneToShowInBackgroundDropDown.addEventListener("change", (e) => {
            this.SceneToShowInBackgroundForm.innerHTML = "";

            if (this.SceneToShowInBackgroundDropDown.value !== "none") {
                this.SceneToShowInBackground = ElementHelper.CreateNewScene(this.SceneToShowInBackgroundDropDown.value, this.SceneToShowInBackgroundForm);
                this.SceneToShowInBackground.Render();
            }
        });
        this.SceneToShowInBackgroundLabel = ElementHelper.CreateLabel("Scene to show in Background");

        this.isTwoBitAnimationCheckBox = document.createElement("input");
        this.isTwoBitAnimationCheckBox.setAttribute("type", "checkbox");
        this.isTwoBitAnimationCheckBox.addEventListener("change", (e) => {
            this.isTwoBitAnimation = this.isTwoBitAnimationCheckBox.checked;
        });
        this.isTwoBitAnimationLabel = ElementHelper.CreateLabel("Is two bit animation?");
    }

    /**
     * Render
     */
    public Render() {
        super.Render();

        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.ContentLabel, this.ContentTextBox));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.AnimationDelayLabel, this.AnimationDelayTextBox));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.NumberOfTimesToRepeatLabel, this.NumberOfTimesToRepeatTextBox));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.SceneToShowInBackgroundLabel, this.SceneToShowInBackgroundDropDown));
        this.screen.appendChild(this.SceneToShowInBackgroundForm);
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.isTwoBitAnimationLabel, this.isTwoBitAnimationCheckBox));
    }

    public ToJson() {
        const ret = super.ToJson();

        ret["Content"] = this.Content;
        ret["AnimationDelay"] = parseInt(this.AnimationDelayTextBox.querySelector("input").value);
        ret["NumberOfTimesToRepeat"] = parseInt(this.NumberOfTimesToRepeatTextBox.querySelector("input").value);
        ret["SceneToShowInBackground"] = this.SceneToShowInBackgroundDropDown.value !== "none" ? this.SceneToShowInBackground.ToJson() : {};
        ret["isTwoBitAnimation"] = this.isTwoBitAnimationCheckBox.checked;

        return ret;
    }
}