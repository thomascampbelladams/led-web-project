class TextScene extends Scene {
    public Content: string;
    private ContentInput: HTMLInputElement;
    private ContentLabel: HTMLLabelElement;
    public Color: number;
    private ColorInput: HTMLInputElement;
    private ColorLabel: HTMLLabelElement;
    public Font: string;
    private FontDropDown: HTMLElement;
    private FontLabel: HTMLLabelElement;
    public CenteredVertically: boolean;
    private CenteredVerticallyCheckbox: HTMLInputElement;
    private CenteredVerticallyLabel: HTMLLabelElement;
    public CenteredHorizontally: boolean;
    private CenteredHorizontallyCheckbox: HTMLInputElement;
    private CenteredHorizontallyLabel: HTMLLabelElement;
    private NumberOfSecondsToShow: number;
    private NumberOfSecondsToShowElement: HTMLElement;
    private NumberOfSecondsToShowLabel: HTMLLabelElement;
    private NumberOfSecondsToShowMin = 2;
    private NumberOfSecondsToShowMax = 15;
    private availableFonts = [
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

    constructor(screen: HTMLElement) {
        super("", screen);

        this.Type = "text";

        this.ContentInput = document.createElement("input");
        this.ContentInput.setAttribute("type", "text");
        this.ContentInput.addEventListener("change", (e) => {
            this.Content = this.ContentInput.value;
        });
        this.ContentLabel = ElementHelper.CreateLabel("Content");

        this.ColorInput = document.createElement("input");
        this.ColorInput.setAttribute("type", "color");
        this.ColorInput.addEventListener("change", (e) => {
            this.Color = parseInt(this.ColorInput.value);
        });
        this.ColorLabel = ElementHelper.CreateLabel("Color of text");

        this.FontDropDown = ElementHelper.CreateFontChooser(this.availableFonts, (e) => {
            this.Font = this.FontDropDown.querySelector('select').value;
        });
        this.FontLabel = ElementHelper.CreateLabel("Font");

        this.CenteredVerticallyCheckbox = document.createElement("input");
        this.CenteredVerticallyCheckbox.setAttribute("type", "checkbox");
        this.CenteredVerticallyCheckbox.addEventListener("change", (e) => {
            this.CenteredVertically = this.CenteredVerticallyCheckbox.checked;
        });
        this.CenteredVerticallyLabel = ElementHelper.CreateLabel("Centered Vertically?");

        this.CenteredHorizontallyCheckbox = document.createElement("input");
        this.CenteredHorizontallyCheckbox.setAttribute("type", "checkbox");
        this.CenteredHorizontallyCheckbox.addEventListener("change", (e) => {
            this.CenteredHorizontally = this.CenteredHorizontallyCheckbox.checked;
        });
        this.CenteredHorizontallyLabel = ElementHelper.CreateLabel("Centered Horizontally?");

        this.NumberOfSecondsToShowElement = ElementHelper.CreateRangeElement(this.NumberOfSecondsToShowMin, this.NumberOfSecondsToShowMax, (e) => {
            this.NumberOfSecondsToShow = parseInt(this.NumberOfSecondsToShowElement.querySelector('input').value);
        });
        this.NumberOfSecondsToShowLabel = ElementHelper.CreateLabel("Number of Seconds To Show");

    }

    /**
     * Render
     */
    public Render() {
        super.Render();

        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.ContentLabel, this.ContentInput));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.ColorLabel, this.ColorInput));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.FontLabel, this.FontDropDown));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.CenteredHorizontallyLabel, this.CenteredHorizontallyCheckbox));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.CenteredVerticallyLabel, this.CenteredVerticallyCheckbox));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.NumberOfSecondsToShowLabel, this.NumberOfSecondsToShowElement));
    }

    public ToJson() {
        const ret = super.ToJson();

        ret["Content"] = this.ContentInput.value;
        ret["Color"] = parseInt(this.ColorInput.value.split("#")[1], 16);
        ret["CenteredVertically"] = this.CenteredVerticallyCheckbox.checked;
        ret["CenteredHorizontally"] = this.CenteredHorizontallyCheckbox.checked;
        ret["Font"] = `${this.FontDropDown.querySelector('select').value}.bdf`;
        ret["NumberOfSecondsToShow"] = parseInt(this.NumberOfSecondsToShowElement.querySelector('input').value);

        return ret;
    }
}