import { Song } from "discord-music-player";
import { Client, Message, TextChannel } from "discord.js";
import { WSBotChannelErrorEvent } from "../bot/WSBotErrorEvent";
import { BasicCommande } from "../command/BasicCommande";
import { CommandeRegister } from "../command/register/CommandeRegister";

export enum PanelButtonKey {
    PAUSE = "Button_Pause",
    STOP = "Button_Stop",
    SKIP = "Button_Skip",
    LOOP_MODE = "Button_Loope_Mode",
    SHUFFLE_MODE = "Button_Shuffle_Mode"
}

export abstract class BasicChannelListener {
    
    _commandeManager : CommandeRegister;
    _client : Client;

    _channel : Map<string,TextChannel>;
    _messageCommande : Map<string,BasicCommande>;

    _commandeIdentifier : string;

    _doubleListen : boolean;

    public constructor(client : Client, commandeManager : CommandeRegister,commandeIdentifier : string) {
        this._client = client;
        this._commandeManager = commandeManager;
        this._commandeIdentifier = commandeIdentifier;
        this._messageCommande = new Map<string,BasicCommande>();
        this._channel = new Map<string,TextChannel>();
        this._messageCommande.set(PanelButtonKey.PAUSE,null);
        this._messageCommande.set(PanelButtonKey.STOP,null);
        this._messageCommande.set(PanelButtonKey.SKIP,null);
        this._messageCommande.set(PanelButtonKey.LOOP_MODE,null);
        this._messageCommande.set(PanelButtonKey.SHUFFLE_MODE,null);
        this._initPannelCommande();
        this._initChannelCommande();
        this._doubleListen = false;
    }

    protected abstract _initChannelCommande();

    public abstract callCommande(message : Message) : boolean;
    protected abstract _initPannelCommande() : void;
    public abstract update(guildID : string) : void;
    public abstract updatePannel(guildID : string) : void;
    protected abstract _pannelMessage(guildID : string) : Promise<void>;

    public getChannel(guildID : string) : TextChannel {
        return this._channel.get(guildID);
    }

    public linkToChannel(channels : TextChannel) : boolean {
        try {
            this._channel.set(channels.guild.id,channels);    
        } 
        catch(err) {
            this._client.emit(WSBotChannelErrorEvent.CHANNEL_LINKING,err);
            return false;
        }

        return true
    }

    public unLinkToChannel(guildID : string) : boolean {
        try {
            this._channel.delete(guildID);
        } catch(err) {
            this._client.emit(WSBotChannelErrorEvent.CHANNEL_UNLINK,err);
            return false;
        }
        return true
    }
}