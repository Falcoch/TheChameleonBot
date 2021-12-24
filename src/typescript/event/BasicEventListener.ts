/**
 * This file don't catch bugs x) ...
 * This file catch discord event and 
 * call a eventManager 
 */

import {Client, Intents,Message} from "discord.js"
import {WSDiscordEvent} from "../discord/WSDiscordEvent" 

export abstract class BasicEventListerner  {

    private _commandeIdentifier : string
    private _discordBot : Client;

    public constructor(client : Client,commandeIdentifier : string) {
       
        this._discordBot = client; 
        this._commandeIdentifier = commandeIdentifier;
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

    public getCommandeIdentifier() : string  {
        return this._commandeIdentifier;
    }

    public setCommandeIdentifier(newIdentifier : string) : void {
        this._commandeIdentifier = newIdentifier;
    }

    public getBot() : Client {
        return this._discordBot;
    }

    protected abstract _ready() : void;
    protected abstract _quit() : void;
    protected abstract _error(error : Error) : void; 
    protected abstract _onCommande(commande : Message) : void;
    protected abstract _warn(message : string); 
}

