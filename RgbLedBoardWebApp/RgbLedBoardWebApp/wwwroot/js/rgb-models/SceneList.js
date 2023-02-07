var SceneList = /** @class */ (function () {
    function SceneList(jsonStr, screen) {
        this.i = 0;
        this.TheScreen = screen;
        this.TimesToRepeat = 1;
        this.Scenes = [];
    }
    SceneList.prototype.AddScene = function (sceneToAdd) {
        this.Scenes[this.i] = sceneToAdd;
        sceneToAdd.IndexValue = this.i;
        this.RenderScene(sceneToAdd);
        sceneToAdd.BindToOnDropDownChange(this.OnSceneChange.bind(this));
        this.i++;
    };
    SceneList.prototype.OnSceneChange = function (scene) {
        var newScene = ElementHelper.CreateNewScene(scene.Type, this.TheScreen);
        this.Scenes[scene.IndexValue] = newScene;
        newScene.IndexValue = scene.IndexValue;
        newScene.BindToOnDropDownChange(this.OnSceneChange.bind(this));
        scene.Dispose();
        newScene.Render();
    };
    /**
     * Render
     */
    SceneList.prototype.Render = function () {
        for (var index = 0; index < this.Scenes.length; index++) {
            var scene = this.Scenes[index];
            this.RenderScene(scene);
        }
    };
    SceneList.prototype.RenderScene = function (scene) {
        scene.Render();
    };
    SceneList.prototype.ToJson = function () {
        var jsonObjs = [];
        for (var i = 0, len = this.Scenes.length; i < len; i++) {
            jsonObjs[i] = this.Scenes[i].ToJson();
        }
        return {
            "Scenes": jsonObjs,
            "TimeToRepeat": this.TimesToRepeat
        };
    };
    return SceneList;
}());
