const { QueueClient, QueueServiceClient } = require("@azure/storage-queue");

export default class AzureQueueHelper {
    private connectionString: string;
    private queueName: string;
    private queueServiceClient: typeof QueueServiceClient;
    private queueClient: typeof QueueClient;

    public constructor(connectionString: string, queueName: string){
        this.connectionString = connectionString;
        this.queueName = queueName;
        this.queueServiceClient = new QueueServiceClient.fromConnectionString(connectionString);
        this.queueClient = this.queueServiceClient.getQueueClient(queueName);
    }

    /**
     * PopValueFromQueue
     */
    public async PopValueFromQueue() {
        var receivedMessages = await this.queueClient.receiveMessages();
        var ret = "";

        if (receivedMessages && receivedMessages.receivedMessageItems.length > 0) {
            var receivedMessage = receivedMessages.receivedMessageItems[0];

            await this.queueClient.deleteMessage(receivedMessage.messageId, receivedMessage.popReceipt);
            ret = receivedMessage.messageText;
        }

        return ret;
    }

    /**
     * AreThereMoreMessagesInTheQueue
     */
    public async AreThereMoreMessagesInTheQueue() {
        return (await this.queueClient.peekMessages()).length > 0;
    }
}