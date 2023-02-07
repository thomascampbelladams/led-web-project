class RainbowTransitionScene extends AnimationScene {
    public BlockHeight: number;
    private BlockHeightRangeElement: HTMLElement;
    private BlockHeightLabel: HTMLLabelElement;
    private BlockHeightMax = 10;
    private BlockHeightMin = 1;
    public BlockWidth: number;
    private BlockWidthRangeElement: HTMLElement;
    private BlockWidthLabel: HTMLLabelElement;
    private BlockWidthMax = 10;
    private BlockWidthMin = 1;


    constructor(screen: HTMLElement) {
        super(screen);

        this.Type = "rainbow transition";

        this.BlockHeightRangeElement = ElementHelper.CreateRangeElement(this.BlockHeightMin, this.BlockHeightMax, (e) => {
            this.BlockHeight = parseInt(this.BlockHeightRangeElement.querySelector('input').value);
        });
        this.BlockHeightLabel = ElementHelper.CreateLabel("Color block height (in pixels)");

        this.BlockWidthRangeElement = ElementHelper.CreateRangeElement(this.BlockWidthMin, this.BlockWidthMax, (e) => {
            this.BlockWidth = parseInt(this.BlockWidthRangeElement.querySelector('input').value);
        });
        this.BlockWidthLabel = ElementHelper.CreateLabel("Color block width (in pixels)");
    }

    /**
     * Render
     */
    public Render() {
        super.Render();

        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.BlockHeightLabel, this.BlockHeightRangeElement));
        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.BlockWidthLabel, this.BlockWidthRangeElement));
    }

    public ToJson() {
        const ret = super.ToJson();

        ret["BlockHeight"] = parseInt(this.BlockHeightRangeElement.querySelector('input').value);
        ret["BlockWidth"] = parseInt(this.BlockWidthRangeElement.querySelector('input').value);

        return ret;
    }
}