import { MusicEventListener } from "../event/MusicEventListerner";
import { WSBotChannelErrorEvent, WSBotErrorEvent } from "./WSBotErrorEvent";
import { ConsoleUtils } from "../util/ConsoleUtils";
import { Queue } from "discord-music-player";
import { ChameleonChannelListener } from "./ChameleonChannelListener";
import { Channel, Message, TextChannel } from "discord.js";
import { CommandeRegister } from "../command/register/CommandeRegister";
import { WSDiscordEvent } from "../discord/WSDiscordEvent";
import { EmbedUtil } from "../util/EmbedUtil";

export class TheChameleonBotEventListener extends MusicEventListener {

    private _channelListener : ChameleonChannelListener

    public constructor(commandeManager : CommandeRegister,commandeIdentifier : string = '%') {
        super(commandeManager,commandeIdentifier); 
        this._channelListener = new ChameleonChannelListener(this,commandeManager,commandeIdentifier);
    }

    public getChannelListener() {
        return this._channelListener;
    }

    protected _initEvent(): void {
        super._initEvent();
        this.on(WSBotErrorEvent.COMMANDE_EXECUTE, (commandeName,errorMessage,commandeChannel) => {
            this._errorCommandeExecution(commandeName,errorMessage,commandeChannel);
        });

        this.on(WSBotErrorEvent.BAD_ARGS_NUMBER, (commandeName,channel) => {
            this._errorBadArgsNumber(commandeName,channel);
        });

        this.on(WSBotErrorEvent.CANNOT_LOAD_SONG, (commandeName,songName,errorMessage,channel) => {
            this._errorLoadingSong(commandeName,songName,errorMessage,channel);
        });

        this.on(WSBotErrorEvent.NOT_ENOUGHT_PERMISSION, (commandeName,permissionNeeded,channel) => {
            this._errorPermission(commandeName,permissionNeeded,channel);
        });

        this.on(WSBotErrorEvent.UNKNOWN_COMMANDE, (CommandeName,channel) => {
            this._errorUnknownCommande(CommandeName,channel);
        });

        this.on(WSBotErrorEvent.UNKNOWN_ERROR, (commandeName,errorMessage,channel) => {
            this._errorUnknownError(commandeName,errorMessage,channel);
        });

        this.on(WSBotErrorEvent.BAD_ARGS_TYPE, (commandeName,typeIntend,channel) => {
            this._errorBadArgsType(commandeName,typeIntend,channel);
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

        this.on(WSBotErrorEvent.EMIT_ERROR, (commandeName,errorEvent,newError,baseError) => {
            this._errorEmitError(commandeName,errorEvent,newError,baseError);
        }); 
    }

    protected _ready(): void {
        ConsoleUtils.logSuccess("Start-up complete !")
    }

    public _commande(commande: Message): void {
        try {
            if(this._channelListener.getChannel() == null || this._channelListener._doubleListen == true) {
                if(!this._commandeManager.callCommande(this,commande))
                    this.emit(WSBotErrorEvent.UNKNOWN_COMMANDE,commande.content.split(' ')[0],commande.channel); 
            }
        }
        catch(err) {
            this.emit(WSBotErrorEvent.UNKNOWN_ERROR,commande.content.split(' ')[0],err,commande.channel);
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
        try {
            if(channel == this._channelListener.getChannel()) {
                this._channelListener.unLinkToChannel();
            }
        } catch(err) {
            this.emit(WSBotChannelErrorEvent.CHANNEL_UNLINK);
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

    protected _errorCommandeExecution(commandeName : string,errorMessage : string,commandeChannel : TextChannel) {
        try {
            ConsoleUtils.logError("Commande Execution : \"" + commandeName + "\" : " + errorMessage);
            if(commandeChannel != null) {
                commandeChannel.send({embeds : [EmbedUtil.errorMessage("Error during the command execution !")]});
            }
        } catch(err) {
            this.emit(WSBotErrorEvent.EMIT_ERROR,commandeName,WSBotErrorEvent.COMMANDE_EXECUTE,err,errorMessage);
        }
    }

    protected _errorBadArgsNumber(commandeName : string,commandeChannel : TextChannel) {
        try {
            ConsoleUtils.logError("Commande Argument : \"" + commandeName + "\".");
            if(commandeChannel != null) {
                commandeChannel.send({embeds : [EmbedUtil.errorMessage("Bad number of argument !")]});
            }
        } catch(err) {
            this.emit(WSBotErrorEvent.EMIT_ERROR,commandeName,WSBotErrorEvent.BAD_ARGS_NUMBER,err,"...");
        }
        
    }

    protected _errorBadArgsType(commandeName : string,typeIntend : string,commandeChannel : TextChannel) {
        try {
            ConsoleUtils.log("Commande Bad Args : \""+ commandeName + "\" given : " + typeIntend + ".");
            if(commandeChannel != null) {
                commandeChannel.send({embeds : [EmbedUtil.errorMessage("Bad argument type ! ( Intend " + typeIntend + " ) !" )]});
            }
        } catch(err) {
            this.emit(WSBotErrorEvent.EMIT_ERROR,commandeName,WSBotErrorEvent.BAD_ARGS_TYPE,err,"...");
        }
    }

    protected _errorLoadingSong(commandeName : string ,songName : string ,errorMessage : string,commandeChannel : TextChannel) {
        try {
            ConsoleUtils.logError("Song Loading : \"" + commandeName + "\" :" + errorMessage);
            if(commandeChannel != null) {
                commandeChannel.send({embeds : [EmbedUtil.errorMessage("Loading song \"" + songName + "\" !")]});
            }
        } catch(err) {
            this.emit(WSBotErrorEvent.EMIT_ERROR,commandeName,WSBotErrorEvent.CANNOT_LOAD_SONG,err,errorMessage);
        }
    }

    protected _errorPermission(commandeName : string ,permissionNeeded : string,commandeChannel : TextChannel) {
        try {
            ConsoleUtils.logError("Commande Permission : \"" + commandeName + "\" : " + permissionNeeded);
            if(commandeChannel != null) {
                commandeChannel.send({embeds : [EmbedUtil.errorMessage("Not enought permission, needed permission : \"" + permissionNeeded + "\" !")]});
            }
        } catch(err) {
            this.emit(WSBotErrorEvent.EMIT_ERROR,commandeName,WSBotErrorEvent.CANNOT_LOAD_SONG,err,"...");
        }
    }

    protected _errorUnknownCommande(commandeName : string,commandeChannel : TextChannel) {
        try {
            ConsoleUtils.logError("Commande Unknown : \"" + commandeName + "\"");
            if(commandeChannel != null) {
                commandeChannel.send({embeds : [EmbedUtil.errorMessage("Unknown Commande : \"" + commandeName.split(' ')[0] + "\" !")]});
            }
        } catch(err) {
            this.emit(WSBotErrorEvent.EMIT_ERROR,commandeName,WSBotErrorEvent.UNKNOWN_COMMANDE,err,"...");
        }
    }

    protected _errorUnknownError(commandeName : string ,errorMessage : string,commandeChannel : TextChannel) {
        try {
            ConsoleUtils.logError("Unknow Error on : \"" + commandeName + "\" : " + errorMessage);
            if(commandeChannel != null) {
                commandeChannel.send({embeds : [EmbedUtil.errorMessage("Unknown Error on : \"" + commandeName + "\" !")]})
            }
        } catch(err) {
            this.emit(WSBotErrorEvent.EMIT_ERROR,commandeName,WSBotErrorEvent.UNKNOWN_ERROR,err,errorMessage);   
        }
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

    protected _errorEmitError(commandeName : string,errorEvent : string, newError : string, basicError : string) {
        ConsoleUtils.logError("Emiting Error : \"" + commandeName + "\" \n Event : " + errorEvent + "\n New Error : " + newError + "\n Basic Error : " + basicError);
    }


}