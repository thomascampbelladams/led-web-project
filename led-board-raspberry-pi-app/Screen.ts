import ScreenHelper from "./Helpers/ScreenHelper";
import SceneList from "./Models/SceneList";
import LogHelper from "./Helpers/Log-Helper";
const fs = require('fs');
const { QueueClient, QueueServiceClient } = require("@azure/storage-queue");
const debug = false;
const logger = new LogHelper(debug);
const screen: ScreenHelper = new ScreenHelper('4x6', '4x6.bdf', logger, Startup);
const configJson: any = JSON.parse(fs.readFileSync(`AzureQueueVariables.json`, 'utf8'));
const queueServiceClient: typeof QueueServiceClient = new QueueServiceClient.fromConnectionString(configJson.AZURE_STORAGE_CONNECTION_STRING);
const queueClient: typeof QueueClient = queueServiceClient.getQueueClient(configJson.AZURE_STORAGE_QUEUE_NAME);
const sceneLists: SceneList[] = [];
let i: number = 0;
let currentDisplayedSceneList: number = 0;

async function Startup() {
    queueClient.receiveMessages().then((receivedMessages) => {
        var didWeGetAQueueMessage: boolean = receivedMessages && receivedMessages.receivedMessageItems && receivedMessages.receivedMessageItems.length > 0;
        var receivedMessage = { messageText: "", messageId: 0, popReceipt: 0 };

        if (didWeGetAQueueMessage) {
            receivedMessage = receivedMessages.receivedMessageItems[0];
    
            var jsonStr = receivedMessage.messageText;
    
            sceneLists[i] = new SceneList(jsonStr, screen, logger);
            i++;

            queueClient.deleteMessage(receivedMessage.messageId, receivedMessage.popReceipt).then(()=>{
                sceneLists[currentDisplayedSceneList].Render();
                currentDisplayedSceneList++;
            });
        } else {
            if (currentDisplayedSceneList >= sceneLists.length) {
                currentDisplayedSceneList = 0;
            }
            
            sceneLists[currentDisplayedSceneList].Render();
            currentDisplayedSceneList++;
        }
    });
}

Startup();