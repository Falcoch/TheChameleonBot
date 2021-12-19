/**
 * This file don't catch bugs x) ...
 * This file catch discord event and 
 * call a eventManager 
 */

import {Client, Intents} from "discord.js"
import {WSDiscordEvent} from "../discord/WSDiscordEvent" 

export class EventListerner  {

    private _privateToken : string = "";
    private _discordBot : Client;

    public constructor(privateBotToken : string) {
        this._privateToken = privateBotToken;
        this._discordBot = new Client({intents: [Intents.FLAGS.GUILDS, 
                                                    Intents.FLAGS.GUILD_MESSAGES, 
                                                    Intents.FLAGS.GUILD_VOICE_STATES
                                                    ]});
        this._initEvent();
    }

    private _initEvent() : void {
        this._discordBot.on(WSDiscordEvent.READY, () => {
            this._ready();
        });

        this._discordBot.on(WSDiscordEvent.QUIT, () => {
            this._quit();
        });

        this._discordBot.on(WSDiscordEvent.MESSAGE_CREATE, (message : string) => {
            if(message.startsWith('%',0))
                this._onCommande(message);
        });
    }

    private _ready() : void {
        
    }
    
    private _quit() : void {

    }

    private _onCommande(commande : string) : void {

    }

    public start() : void {
        this._discordBot.login(this._privateToken);
    }
}

