import { MusicEventListener } from "../event/MusicEventListerner";
import { WSBotChannelErrorEvent, WSBotErrorEvent } from "./WSBotErrorEvent";
import { ConsoleUtils } from "../util/ConsoleUtils";
import { Queue } from "discord-music-player";
import { ChameleonChannelListener } from "./ChameleonChannelListener";
import { Channel, Message } from "discord.js";
import { CommandeRegister } from "../command/register/CommandeRegister";
import { WSDiscordEvent } from "../discord/WSDiscordEvent";

export class TheChameleonBotEventListener extends MusicEventListener {

    private _channelListener : ChameleonChannelListener

    public constructor(commandeManager : CommandeRegister,commandeIdentifier : string = '%') {
        super(commandeManager,commandeIdentifier); 
        this._channelListener = new ChameleonChannelListener(this,commandeManager,commandeIdentifier);
    }

    protected _initEvent(): void {
        super._initEvent();
        this.on(WSBotErrorEvent.COMMANDE_EXECUTE, (commandeName,errorMessage) => {
            this._errorCommandeExecution(commandeName,errorMessage);
        });

        this.on(WSBotErrorEvent.BAD_ARGS_NUMBER, (commandeName,numberGivend) => {
            this._errorBadArgsNumber(commandeName,numberGivend);
        });

        this.on(WSBotErrorEvent.CANNOT_LOAD_SONG, (commandeName,songName,errorMessage) => {
            this._errorLoadingSong(commandeName,songName,errorMessage);
        });

        this.on(WSBotErrorEvent.NOT_ENOUGHT_PERMISSION, (commandeName,permissionNeeded) => {
            this._errorPermission(commandeName,permissionNeeded);
        });

        this.on(WSBotErrorEvent.UNKNOWN_COMMANDE, (CommandeName) => {
            this._errorUnknownCommande(CommandeName);
        });

        this.on(WSBotErrorEvent.UNKNOWN_ERROR, (commandeName,errorMessage) => {
            this._errorUnknownError(commandeName,errorMessage);
        });

        this.on(WSBotErrorEvent.BAD_ARGS_TYPE, (commandeName,typeIntend) => {
            this._errorBadArgsType(commandeName,typeIntend);
        });

        this.on(WSBotChannelErrorEvent.CHANNEL_UNKNOWN_COMMANDE, (commandeName) => {
            this._errorChannelUnknownCommande(commandeName);
        });

        this.on(WSBotChannelErrorEvent.CHANNEL_UNKNOWN_ERROR, (commandeName,errorMessage) => {
            this._errorUnknownChannelerror(commandeName,errorMessage);
        });

        this.on(WSBotChannelErrorEvent.CHANNEL_CREATION, (errorMessage) => {
            this._errorChannelCreation(errorMessage);
        });

        this.on(WSDiscordEvent.MESSAGE_CREATE,(message) => {
            if(!message.author.bot) {
                if(this._channelListener._channel != null || this._channelListener._doubleListen == true)
                    if(message.channel == this._channelListener._channel)
                        this._channelCommande(message);
            }
        });
    }

    protected _ready(): void {
        ConsoleUtils.logSuccess("Start-up complete !")
    }

    public _commande(commande: Message): void {
        try {
            if(this._channelListener.getChannel() == null || this._channelListener._doubleListen == true) {
                if(!this._commandeManager.callCommande(this,commande))
                    this.emit(WSBotErrorEvent.UNKNOWN_COMMANDE,commande.content.split(' ')[0],'final'); 
            }
        }
        catch(err) {
            this.emit(WSBotErrorEvent.UNKNOWN_ERROR,commande.content.split(' ')[0],err);
        }
    }

    public _channelCommande(message : Message) {
        if(this._channelListener.getChannel() != null || this._channelListener._doubleListen == true) {
            try {
                if(!this._channelListener.callCommande(message))
                    this.emit(WSBotChannelErrorEvent.CHANNEL_UNKNOWN_COMMANDE,message.content);
            }
            catch(err) {
                this.emit(WSBotChannelErrorEvent.CHANNEL_UNKNOWN_COMMANDE,message.content,err);
            }
        }
    }

    protected _channelDelete(channel: Channel) {
        if(channel == this._channelListener.getChannel()) {
            this._channelListener.unLinkToChannel();
        }
    }

    protected _channelCreate(channel: Channel) {
        
    }

    protected _channelUpdate(channel: Channel) {
    
    }

    protected _quit(): void {
        
    }

    protected _error(error: Error): void {
        
    }

    protected _warn(message : string) : void {

    }

    protected _songAdd(queue: any, song: any): void {
        
    }

    protected _songChanged(queue: any, newSong: any, oldSong: any): void {
        
    }

    protected _playlistAdd(queue: any, playlist: any): void {
        
    }

    protected _queueEnd(queue: any): void {
        
    }

    protected _queueDestroyed(queue: any): void {
        
    }

    protected _channelEmpty(queue: Queue): void {
        for(let i = 0; i < queue.songs.length; i++) {
            queue.skip();
        }
    }

    protected _errorCommandeExecution(commandeName : string,errorMessage : string) {
        ConsoleUtils.logError("Commande Execution : \"" + commandeName + "\" : " + errorMessage);
    }

    protected _errorBadArgsNumber(commandeName : string,numberGiven : string) {
        ConsoleUtils.logError("Commande Argument : \"" + commandeName + "\" : Needed + " + numberGiven);
    }

    protected _errorBadArgsType(commandeName : string,typeIntend : string) {
        ConsoleUtils.log("Commande Bad Args : \""+ commandeName + "\" given : " + typeIntend + ".");
    }

    protected _errorLoadingSong(commandeName : string ,songName : string ,errorMessage : string) {
        ConsoleUtils.logError("Song Loading : \"" + commandeName + "\" :" + errorMessage);
    }

    protected _errorPermission(commandeName : string ,permissionNeeded : string) {
        ConsoleUtils.logError("Commande Permission : \"" + commandeName + "\" : " + permissionNeeded);
    }

    protected _errorUnknownCommande(commandeName : string) {
        ConsoleUtils.logError("Commande Unknown : \"" + commandeName + "\"");
    }

    protected _errorUnknownError(commandeName : string ,errorMessage : string) {
        ConsoleUtils.logError("Unknow Error on : \"" + commandeName + "\" : " + errorMessage);
    }

    protected _errorUnknownChannelerror(commandeName : string, errorMessage : string) {
        ConsoleUtils.logError("Unknow Channel Error on : \"" + commandeName + "\" : " + errorMessage);
    }

    protected _errorChannelCreation(errorMessage : string) {
        ConsoleUtils.logError("Creation Channel Error : \" Setup-Channel \" : " + errorMessage);
    }

    protected _errorChannelUnknownCommande(commandeName : string) {
        ConsoleUtils.logError("Channel Commande Unknown : \"" + commandeName + "\"");
    }


}