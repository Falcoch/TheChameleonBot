import { MusicEventListener } from "../event/MusicEventListerner";
import { Message } from "discord.js";
import { TheChameleonBotCommandeManager } from "./ChameleonCommandeManager";
import { WSBotErrorEvent } from "./WSBotErrorEvent";
import { MessageUtil } from "../util/MessageUtil";

export class TheChameleonBotEventListener extends MusicEventListener {

    public constructor(commandeIdentifier : string = '%') {
        super(commandeIdentifier); 
    }

    protected _initEvent(): void {
        super._initEvent();
        this.on(WSBotErrorEvent.EXECUTE_ERROR, () => {
            MessageUtil.errorMessage("Error when executing the commande !");
        });

        this.on(WSBotErrorEvent.BAD_ARGS_NUMBER, () => {
            MessageUtil.errorMessage("Bad number of argument !");
        });

        this.on(WSBotErrorEvent.CANNOT_LOAD_SONG, () => {
            MessageUtil.errorMessage("Cannot load this song !");
        });

        this.on(WSBotErrorEvent.NOT_ENOUGHT_PERMISSION, () => {
            MessageUtil.errorMessage("Not enought permission for that !");
        });

        this.on(WSBotErrorEvent.UNKNOW_ERROR, () => {
            MessageUtil.errorMessage("Not enought Argument ...")
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