/**
 * This file don't catch bugs x) ...
 * This file catch discord event and 
 * call a eventManager 
 */

import {Client, Intents,Message} from "discord.js"
import {WSDiscordEvent} from "../discord/WSDiscordEvent" 
import {EnvData} from "../Data/EnvData"

export abstract class EventListerner  {

    private _privateToken : string;
    private _discordBot : Client;
    private _commandeIdentifier : string

    public constructor(privateBotToken : string) {
        EnvData.configEnv();
        this._privateToken = privateBotToken;
        this._discordBot = new Client({intents: [Intents.FLAGS.GUILDS, 
                                                    Intents.FLAGS.GUILD_MESSAGES, 
                                                    Intents.FLAGS.GUILD_VOICE_STATES
                                                    ]});
        this._commandeIdentifier = EnvData.getIdentifierToken();
        this._initEvent();
    }

    private _initEvent() : void {
        this._discordBot.on(WSDiscordEvent.READY, () => {
            this._ready();
        });

        this._discordBot.on(WSDiscordEvent.QUIT, () => {
            this._quit();
        });

        this._discordBot.on(WSDiscordEvent.MESSAGE_CREATE, (message : Message) => {
            if(!message.author.bot && message.content[0] == this._commandeIdentifier && message.content.length > 1)
            {
                message.content = message.content.split(this._commandeIdentifier)[1];
                this._onCommande(message);
            }
        });

        this._discordBot.on(WSDiscordEvent.ERROR, (error) => {
            this._error(error);
        });

        this._discordBot.on(WSDiscordEvent.WARN, (message) => {
            this._warn(message);
        });
    }

    private _ready() : void {

    }
    
    private _quit() : void {
        
    } 
    
    private _error(error : Error) : void {

    }

    private _onCommande(commande : Message) : void {
        
    }

    private _warn(message : string) {

    }
}

