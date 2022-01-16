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

    _channel : TextChannel;
    _messageCommande : Map<string,BasicCommande>;

    _commandeIdentifier : string;

    _doubleListen : boolean;

    public constructor(client : Client, commandeManager : CommandeRegister,commandeIdentifier : string) {
        this._client = client;
        this._commandeManager = commandeManager;
        this._commandeIdentifier = commandeIdentifier;
        this._messageCommande = new Map<string,BasicCommande>();
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
    public abstract update() : void;
    public abstract updatePannel() : void;
    protected abstract _pannelMessage(song : Song) : Promise<void>;

    public getChannel() : TextChannel {
        return this._channel;
    }

    public linkToChannel(channels : TextChannel) : boolean {
        try {
            this._channel = channels;    
        } 
        catch(err) {
            this._client.emit(WSBotChannelErrorEvent.CHANNEL_LINKING,err);
            return false;
        }

        return true
    }

    public unLinkToChannel() : boolean {
        try {
            this._channel = null
        } catch(err) {
            this._client.emit(WSBotChannelErrorEvent.CHANNEL_UNLINK,err);
            return false;
        }
        return true
    }
}