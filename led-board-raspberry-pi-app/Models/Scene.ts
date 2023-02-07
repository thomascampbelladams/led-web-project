import ScreenHelper from "../Helpers/ScreenHelper";
import LogHelper from "../Helpers/Log-Helper";

export default class Scene {
    public Type: string;
    private logger: LogHelper;

    constructor(jsonObj: any, logger: LogHelper) {
        for (let prop in jsonObj) {
            this[prop] = jsonObj[prop];
        }

	this.logger = logger;
    }

    /**
     * Render
     */
    public Render(screen: ScreenHelper, IsBackgroundScene: boolean = false) {
        
    }
}
