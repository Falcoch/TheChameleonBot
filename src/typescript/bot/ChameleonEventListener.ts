import { MusicEventListener } from "../event/MusicEventListerner";
import { Message } from "discord.js";
import { TheChameleonBotCommandeManager } from "./ChameleonCommandeManager";
import { WSBotErrorEvent } from "./WSBotErrorEvent";
import { EmbedUtil } from "../util/EmbedUtil";
import { ConsoleUtils } from "../util/ConsoleUtils";

export class TheChameleonBotEventListener extends MusicEventListener {

    public constructor(commandeIdentifier : string = '%') {
        super(commandeIdentifier); 
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
    }

    protected _ready(): void {
        ConsoleUtils.logSuccess("Start-up complete !")
    }

    protected _commande(commande: Message): void {
        if(!TheChameleonBotCommandeManager.callCommande(this,commande))
            this.emit(WSBotErrorEvent.COMMANDE_EXECUTE); 
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

    protected _channelEmpty(queue: any): void {
        
    }

    protected _errorCommandeExecution(commandeName : string,errorMessage : string) {
        ConsoleUtils.logError("Commande Execution : \"" + commandeName + "\" : " + errorMessage);
    }

    protected _errorBadArgsNumber(commandeName,numberGiven) {
        ConsoleUtils.logError("Commande Argument : \"" + commandeName + "\" : Needed + " + numberGiven);
    }

    protected _errorLoadingSong(commandeName,songName,errorMessage) {
        ConsoleUtils.logError("Song Loading : \"" + commandeName + "\" :" + errorMessage);
    }

    protected _errorPermission(commandeName,permissionNeeded) {
        ConsoleUtils.logError("Commande Permission : \"" + commandeName + "\" : " + permissionNeeded);
    }

    protected _errorUnknownCommande(commandeName) {
        ConsoleUtils.logError("Commande Unknown : \"" + commandeName + "\"");
    }

    protected _errorUnknownError(commandeName,errorMessage) {
        ConsoleUtils.logError("Unknow Error on : \"" + commandeName + "\" : " + errorMessage);
    }
}