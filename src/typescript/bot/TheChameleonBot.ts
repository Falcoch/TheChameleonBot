import { TheChameleonBotEventListener } from "./ChameleonEventListener";
import { TheChameleonBotCommandeManager } from "./ChameleonCommandeManager";

export class TheChameleonBot {
    
    private _eventListener : TheChameleonBotEventListener;
    private _commandeManager : TheChameleonBotCommandeManager;
    private _privateBotToken : string;

    public constructor(privateBotToken : string,commandeIdentifier : string = '%') {
        this._privateBotToken = privateBotToken;
        
        this._commandeManager = new TheChameleonBotCommandeManager();
        this._eventListener = new TheChameleonBotEventListener(this._commandeManager,commandeIdentifier);
    }

    public listen() {
        this._eventListener.login(this._privateBotToken);
    }
}

