import Scene from "./Scene";
import ScreenHelper from "../Helpers/ScreenHelper";

export default class TextScene extends Scene {
    public Content: string;
    public Color: number;
    public Font: string;
    public CenteredVertically: boolean;
    public CenteredHorizontally: boolean;
    public NumberOfSecondsToShow: number;

    /**
     * Render
     */
    public Render(screen: ScreenHelper, IsBackgroundScene: boolean = false) {
        let fontName: string = this.Font.split('.')[0];
        screen.changeFont(fontName, this.Font);

        if (this.CenteredHorizontally && this.CenteredVertically) {
            screen.drawCenteredText(this.Content, this.Color, !IsBackgroundScene);
            if(!IsBackgroundScene) screen.clearDisplay(this.NumberOfSecondsToShow);
        } else if (this.CenteredVertically) {
            screen.drawVerticallyCenteredText(this.Content, this.Color, !IsBackgroundScene);
            if(!IsBackgroundScene) screen.clearDisplay(this.NumberOfSecondsToShow);
        } else if (this.CenteredHorizontally){
            screen.drawHorizCenteredText(this.Content, this.Color, !IsBackgroundScene);
            if(!IsBackgroundScene) screen.clearDisplay(this.NumberOfSecondsToShow);
        } else {
            screen.drawCenteredText(this.Content, this.Color, !IsBackgroundScene);
            if(!IsBackgroundScene) screen.clearDisplay(this.NumberOfSecondsToShow);
        }
    }
}
