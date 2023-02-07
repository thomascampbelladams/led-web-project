class RgbScreenForm {
    private AddButton: HTMLElement;
    private SubmitButton: HTMLElement;
    private LoadingIndicator: HTMLElement;
    private StatusContainer: HTMLElement;
    private SceneList: SceneList;

    constructor(screen: HTMLElement) {
        const buttonContainer = document.createElement("div");

        this.SceneList = new SceneList("", screen);
        this.SceneList.AddScene(new Scene("", screen));

        this.AddButton = document.createElement("button");
        this.AddButton.innerText = "Add Scene +";
        this.AddButton.addEventListener("click", (e) => {
            this.SceneList.AddScene(new Scene("", screen));
        });
        buttonContainer.appendChild(this.AddButton);

        this.SubmitButton = document.createElement("button");
        this.SubmitButton.innerText = "Submit";
        this.SubmitButton.addEventListener("click", (e) => {
            const jsonStr = JSON.stringify(this.SceneList.ToJson());
            const req = new XMLHttpRequest();
            this.LoadingIndicator.classList.remove("hidden");
            this.StatusContainer.innerText = "Posting...";

            req.open('POST', '/Home/RgbScreenPost');
            req.onreadystatechange = function () {
                if (req.readyState === 4) {
                    this.LoadingIndicator.classList.add("hidden");

                    if (req.status === 200) {
                        this.StatusContainer.innerText = "SUCCESS";
                    } else {
                        this.StatusContainer.innerText = "FAILURE";
                    }
                }
            }.bind(this);
            req.send(jsonStr);

            console.log(this.SceneList.ToJson());
        });
        buttonContainer.appendChild(this.SubmitButton);

        this.LoadingIndicator = document.createElement("div");
        this.LoadingIndicator.setAttribute("class", "loader box-rotation hidden");
        buttonContainer.appendChild(this.LoadingIndicator);

        this.StatusContainer = document.createElement("span");
        buttonContainer.appendChild(this.StatusContainer);

        screen.appendChild(buttonContainer);
    }
}

const screenElem: HTMLElement = document.createElement("div");
screenElem.setAttribute('id', "the-screen");
document.body.appendChild(screenElem);
new RgbScreenForm(screenElem);