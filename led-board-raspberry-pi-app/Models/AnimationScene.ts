import Scene from "./Scene";
import ScreenHelper from "../Helpers/ScreenHelper";
import LogHelper from "../Helpers/Log-Helper";

export default class AnimationScene extends Scene {
    public Content: number[][][];
    public AnimationDelay: number;
    public NumberOfTimesToRepeat: number;
    public SceneToShowInBackground: any;
    public isTwoBitAnimation: boolean;

    /**
     * Render
     */
    public Render(screen: ScreenHelper, IsBackgroundScene: boolean = false) {
        let backgroundScene = (this.SceneToShowInBackground) ? screen.TranslateScene(this.SceneToShowInBackground) : null;

        screen.doAnimation(this.Content, this.AnimationDelay, this.NumberOfTimesToRepeat, () => {
            if (backgroundScene) {
                backgroundScene.Render(screen, true);
            }
        }, this.isTwoBitAnimation);
    }
}
