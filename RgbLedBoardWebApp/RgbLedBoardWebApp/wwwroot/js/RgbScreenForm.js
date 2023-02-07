var RgbScreenForm = /** @class */ (function () {
    function RgbScreenForm(screen) {
        var _this = this;
        var buttonContainer = document.createElement("div");
        this.SceneList = new SceneList("", screen);
        this.SceneList.AddScene(new Scene("", screen));
        this.AddButton = document.createElement("button");
        this.AddButton.innerText = "Add Scene +";
        this.AddButton.addEventListener("click", function (e) {
            _this.SceneList.AddScene(new Scene("", screen));
        });
        buttonContainer.appendChild(this.AddButton);
        this.SubmitButton = document.createElement("button");
        this.SubmitButton.innerText = "Submit";
        this.SubmitButton.addEventListener("click", function (e) {
            var jsonStr = JSON.stringify(_this.SceneList.ToJson());
            var req = new XMLHttpRequest();
            _this.LoadingIndicator.classList.remove("hidden");
            _this.StatusContainer.innerText = "Posting...";
            req.open('POST', '/Home/RgbScreenPost');
            req.onreadystatechange = function () {
                if (req.readyState === 4) {
                    this.LoadingIndicator.classList.add("hidden");
                    if (req.status === 200) {
                        this.StatusContainer.innerText = "SUCCESS";
                    }
                    else {
                        this.StatusContainer.innerText = "FAILURE";
                    }
                }
            }.bind(_this);
            req.send(jsonStr);
            console.log(_this.SceneList.ToJson());
        });
        buttonContainer.appendChild(this.SubmitButton);
        this.LoadingIndicator = document.createElement("div");
        this.LoadingIndicator.setAttribute("class", "loader box-rotation hidden");
        buttonContainer.appendChild(this.LoadingIndicator);
        this.StatusContainer = document.createElement("span");
        buttonContainer.appendChild(this.StatusContainer);
        screen.appendChild(buttonContainer);
    }
    return RgbScreenForm;
}());
var screenElem = document.createElement("div");
screenElem.setAttribute('id', "the-screen");
document.body.appendChild(screenElem);
new RgbScreenForm(screenElem);
