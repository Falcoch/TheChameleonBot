import { TheChameleonBotEventListener } from "./ChameleonEventListener";
import { Client, Intents} from "discord.js";

import { TheChameleonBotCommandeManager } from "./ChameleonCommandeManager";


export class TheChameleonBot {
    
    private _eventListener : TheChameleonBotEventListener;
    private _privateBotToken : string;

    public constructor(privateBotToken : string,commandeIdentifier : string = '%') {
        this._privateBotToken = privateBotToken;
        TheChameleonBotCommandeManager.registerCommande();
        this._eventListener = new TheChameleonBotEventListener(commandeIdentifier);
    }

    public listen() {
        this._eventListener.login(this._privateBotToken);
    }
}

