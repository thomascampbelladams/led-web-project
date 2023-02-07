class SceneList {
    public Scenes: Scene[];
    public TimesToRepeat: number;
    private TheScreen: HTMLElement;
    private i = 0;

    constructor(jsonStr: string, screen: HTMLElement) {
        this.TheScreen = screen;
        this.TimesToRepeat = 1;
        this.Scenes = [];
    }

    public AddScene(sceneToAdd: Scene) {
        this.Scenes[this.i] = sceneToAdd;
        sceneToAdd.IndexValue = this.i;
        this.RenderScene(sceneToAdd);
        sceneToAdd.BindToOnDropDownChange(this.OnSceneChange.bind(this));

        this.i++;
    }

    private OnSceneChange(scene: Scene) {
        const newScene = ElementHelper.CreateNewScene(scene.Type, this.TheScreen);

        this.Scenes[scene.IndexValue] = newScene;
        newScene.IndexValue = scene.IndexValue;

        newScene.BindToOnDropDownChange(this.OnSceneChange.bind(this));
        scene.Dispose();
        newScene.Render();
    }

    /**
     * Render
     */
    public Render() {
        for (let index = 0; index < this.Scenes.length; index++) {
            const scene = this.Scenes[index];

            this.RenderScene(scene);
        }
    }

    private RenderScene(scene: Scene) {
        scene.Render();
    }

    public ToJson() {
        const jsonObjs = [];

        for (let i = 0, len = this.Scenes.length; i < len; i++) {
            jsonObjs[i] = this.Scenes[i].ToJson();
        }

        return {
            "Scenes": jsonObjs,
            "TimeToRepeat": this.TimesToRepeat
        };
    }
}