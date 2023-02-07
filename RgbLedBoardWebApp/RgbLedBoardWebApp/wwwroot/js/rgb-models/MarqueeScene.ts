class MarqueeScene extends TextScene {
    public AnimationDelay: number;
    private AnimationDelayRangeElement: HTMLElement;
    private AnimationDelayLabel: HTMLLabelElement;
    private MaxDelay = 100;
    private MinDelay = 0;

    constructor(screen: HTMLElement, isHorizontal: boolean) {
        super(screen);

        this.Type = (isHorizontal) ? "horizontal marquee" : "vertical marquee";

        this.AnimationDelayRangeElement = ElementHelper.CreateRangeElement(this.MinDelay, this.MaxDelay, (e) => {
            this.AnimationDelay = parseInt(this.AnimationDelayRangeElement.querySelector('input').value);
        });
        this.AnimationDelayLabel = ElementHelper.CreateLabel("Animation Delay");
    }

    /**
     * async Render
     */
    public Render() {
        super.Render();

        this.screen.appendChild(ElementHelper.CombineIntoFormGroup(this.AnimationDelayLabel, this.AnimationDelayRangeElement));
    }

    public ToJson() {
        const ret = super.ToJson();

        ret["AnimationDelay"] = parseInt(this.AnimationDelayRangeElement.querySelector('input').value);

        return ret;
    }
}