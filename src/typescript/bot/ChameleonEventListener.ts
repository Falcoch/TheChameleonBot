import { MusicEventListener } from "../event/MusicEventListerner";
import { Message } from "discord.js";
import { TheChameleonBotCommandeManager } from "./ChameleonCommandeManager";
import { WSBotErrorEvent } from "./WSBotErrorEvent";

export class TheChameleonBotEventListener extends MusicEventListener {

    public constructor(commandeIdentifier : string = '%') {
        super(commandeIdentifier); 
    }

    protected _initEvent(): void {
        super._initEvent();
        this.on(WSBotErrorEvent.EXECUTE_ERROR, () => {
            // Error Message !
        });
    }

    protected _ready(): void {
        console.log("Ready !");
    }

    protected _commande(commande: Message): void {
        if(!TheChameleonBotCommandeManager.callCommande(this,commande))
            this.emit(WSBotErrorEvent.EXECUTE_ERROR); 
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
}