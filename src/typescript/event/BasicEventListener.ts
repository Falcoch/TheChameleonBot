/**
 * This file don't catch bugs x) ...
 * This file catch discord event and 
 * call a eventManager 
 */

import {Channel, Client, Intents,Message} from "discord.js"
import {WSDiscordEvent} from "../discord/WSDiscordEvent"
import { Player } from "discord-music-player"; 
import { CommandeRegister } from "../command/register/CommandeRegister";

export abstract class BasicEventListerner extends Client  {

    protected _commandeIdentifier : string
    protected _commandeManager : CommandeRegister;

    public constructor(commandeManager,commandeIdentifier : string = '%') {
        super({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]})

        //@ts-ignore
        super.player = new Player(this,{leaveOnEmpty: false,}); 
        this._commandeIdentifier = commandeIdentifier;
        this._commandeManager = commandeManager;
        this._initEvent();
    }

    protected _initEvent() : void {
        this.on(WSDiscordEvent.READY, () => {
            this._ready();
        });

        this.on(WSDiscordEvent.QUIT, () => {
            this._quit();
        });

        this.on(WSDiscordEvent.MESSAGE_CREATE, async (message : Message) => {
            if(!message.author.bot && message.content[0] == this._commandeIdentifier && message.content.length > 1)
            {
                let newMessage : Message = Object.create(message);
                newMessage.content = message.content.split(this._commandeIdentifier)[1];
                this._commande(newMessage);
            }
        });

        this.on(WSDiscordEvent.ERROR, (error) => {
            this._error(error);
        });

        this.on(WSDiscordEvent.WARN, (message) => {
            this._warn(message);
        });

        this.on(WSDiscordEvent.CHANNEL_DELETE, (channel : Channel) => {
            this._channelDelete(channel);
        });

        this.on(WSDiscordEvent.CHANNEL_CREATE, (channel) => {
            this._channelCreate(channel);
        });

        this.on(WSDiscordEvent.CHANNEL_UPDATE, (channel) => {
            this._channelUpdate(channel);
        });

    }

    public getCommandeIdentifier() : string  {
        return this._commandeIdentifier;
    }

    public setCommandeIdentifier(newIdentifier : string) : void {
        this._commandeIdentifier = newIdentifier;
    }

    protected abstract _ready() : void;
    protected abstract _quit() : void;
    protected abstract _error(error : Error) : void; 
    protected abstract _commande(commande : Message) : void;
    protected abstract _warn(message : string); 

    protected abstract _channelDelete(channel : Channel);
    protected abstract _channelCreate(channel : Channel);
    protected abstract _channelUpdate(channel : Channel);
    
}

