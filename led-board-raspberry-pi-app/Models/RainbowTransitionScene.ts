import AnimationScene from "./AnimationScene";
import ScreenHelper from "../Helpers/ScreenHelper";

export default class RainbowTransitionScene extends AnimationScene {
    public BlockHeight: number;
    public BlockWidth: number;

    /**
     * Render
     */
    public async Render(screen: ScreenHelper, IsBackgroundScene: boolean = false) {
        let backgroundScene = (this.SceneToShowInBackground) ? screen.TranslateScene(this.SceneToShowInBackground) : null;

        screen.rainbowTransition(this.AnimationDelay, this.BlockHeight, this.BlockWidth, () => {
            if (backgroundScene) {
                backgroundScene.Render(screen, true);
            }
        });
    }
}