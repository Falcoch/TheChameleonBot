import { MusicEventListener } from "../event/MusicEventListerner";
import { Message } from "discord.js";
import { WSBotErrorEvent } from "./WSBotErrorEvent";
import { ConsoleUtils } from "../util/ConsoleUtils";
import { Queue } from "discord-music-player";

export class TheChameleonBotEventListener extends MusicEventListener {

    public constructor(commandeManager,commandeIdentifier : string = '%') {
        super(commandeManager,commandeIdentifier); 
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
        })
    }

    protected _ready(): void {
        ConsoleUtils.logSuccess("Start-up complete !")
    }

    protected _commande(commande: Message): void {
        if(!this._commandeManager.callCommande(this,commande))
            this.emit(WSBotErrorEvent.UNKNOWN_COMMANDE,commande.content.split(' ')[0]); 
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

    
}