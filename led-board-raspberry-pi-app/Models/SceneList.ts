import ScreenHelper from "../Helpers/ScreenHelper";
import Scene from "./Scene";
import LogHelper from "../Helpers/Log-Helper";

export default class SceneList {
    public Scenes: Scene[];
    public TimesToRepeat: number;
    private TheScreen: ScreenHelper;
    private logger: LogHelper;

    constructor(jsonStr: string, screen: ScreenHelper, logger: LogHelper) {
        let jsonObj: any = JSON.parse(jsonStr);
        let i: number = 0;
        this.TheScreen = screen;

        this.TimesToRepeat = jsonObj["TimesToRepeat"];
        this.Scenes = [];

        jsonObj["Scenes"].forEach(obj => {
            this.Scenes[i] = this.TheScreen.TranslateScene(obj);

            i++;
        });

        this.logger = logger;
    }

    /**
     * Render
     */
    public Render() {
        for (let index = 0; index < this.Scenes.length; index++) {
            const scene = this.Scenes[index];

            scene.Render(this.TheScreen);
        }

        this.TheScreen.runQueue();
    }
}
