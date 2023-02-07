export default class LogHelper {
	private isDebug: boolean;
	private logMessage: string;
	private timeOutHandle: any;

	constructor(isDebug: boolean){
		this.isDebug = isDebug;
		this.logMessage = "";
		this.timeOutHandle = {};
	}

	public LogString(message: string) {
		if(this.isDebug) {
			this.logMessage = `\n${this.logMessage}\n${message}`;

			if(this.timeOutHandle) clearTimeout(this.timeOutHandle);

			this.timeOutHandle = global.setTimeout(() => {
				console.log(this.logMessage);
				
				this.logMessage = "";
				this.timeOutHandle = null;
			}, 1);
		}
	}

	public SetDebugFlag(debug: boolean) {
		this.isDebug = debug;
	}

	public GetDebugFlag(): boolean {
		return this.isDebug;
	}
}
