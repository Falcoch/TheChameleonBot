import { MusicEventListener } from "../event/MusicEventListerner";
import { CommandeManager } from "../command/CommandeRegister";
import { Client, Message } from "discord.js";
import { TheChameleonBotCommandeManager } from "./ChameleonCommandeManager";

export class TheChameleonBotEventListener extends MusicEventListener {

    public constructor(discordBot : Client) {
        super(discordBot);
    }

    protected _ready(): void {
        
    }

    protected _onCommande(commande: Message): void {
        TheChameleonBotCommandeManager.callCommande(this._discordBot,commande)
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