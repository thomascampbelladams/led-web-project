import ScreenHelper from "../Helpers/ScreenHelper";
import TextScene from "./TextScene";

export default class MarqueeScene extends TextScene {
    public AnimationDelay: number;

    /**
     * async Render
     */
    public Render(screen: ScreenHelper) {
        let fontName: string = this.Font.split('.')[0];
        screen.changeFont(fontName, this.Font);

        switch(this.Type) {
            case "horizontal marquee":
                screen.horizontalMarqueeText(this.Content, this.Color, this.AnimationDelay, false);
                break;
            
            case "vertical marquee":
                screen.verticalMarqueeText(this.Content, this.Color, this.AnimationDelay, false);
                break;
        }
    }
}