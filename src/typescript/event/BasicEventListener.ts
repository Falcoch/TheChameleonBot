/**
 * This file don't catch bugs x) ...
 * This file catch discord event and 
 * call a eventManager 
 */

import {Client, Intents,Message} from "discord.js"
import {WSDiscordEvent} from "../discord/WSDiscordEvent" 
import {EnvData} from "../data/EnvData"

export abstract class BasicEventListerner  {

    private _commandeIdentifier : string
    protected _discordBot : Client;

    public constructor(client : Client) {
        EnvData.configEnv();
        this._discordBot = client; 
        this._commandeIdentifier = EnvData.getIdentifierToken();
        this._initEvent();
    }

    protected _initEvent() : void {
        this._discordBot.on(WSDiscordEvent.READY, () => {
            this._ready();
        });

        this._discordBot.on(WSDiscordEvent.QUIT, () => {
            this._quit();
        });

        this._discordBot.on(WSDiscordEvent.MESSAGE_CREATE, async (message : Message) => {
            if(!message.author.bot && message.content[0] == this._commandeIdentifier && message.content.length > 1)
            {
                message.content = message.content.split(this._commandeIdentifier)[1];
                message.content = message.content.toLowerCase();
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

    protected abstract _ready() : void;
    protected abstract _quit() : void;
    protected abstract _error(error : Error) : void; 
    protected abstract _onCommande(commande : Message) : void;
    protected abstract _warn(message : string); 
}

