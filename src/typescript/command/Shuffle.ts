import { Queue } from "discord-music-player";
import { Client, Message, MessageEmbed } from "discord.js";
import { WSBotErrorEvent } from "../bot/WSBotErrorEvent";
import { EmbedUtil } from "../util/EmbedUtil";
import { BasicCommande } from "./BasicCommande";

export class Shuffle implements BasicCommande {
    
    commandeName: string[];

    activated: boolean;
    adminOnly: boolean;
    secret: boolean;

    description: string;

    public constructor(active : boolean, admOnly : boolean) {
        this.commandeName = ['shuffle','hasard'];
        this.activated = active;
        this.adminOnly = admOnly;
        this.secret = false;

        this.description = "Allow you to suffle all song in queue";
    }

    public async execute(client: Client<boolean>, commande: Message<boolean>, silent : boolean): Promise<void> {
        try {
            //@ts-ignore
            let queue : Queue = client.player.getQueue(commande.guild.id);

            try {
                if(queue != null) {
                    queue.shuffle();
                    !silent ?commande.channel.send({embeds: [EmbedUtil.normalMessage("Shuffle","Shuffle queue success !")]}) : "";
                } 
                else {
                    !silent ?commande.channel.send({embeds : [EmbedUtil.normalMessage("Shuffle","There is nothing to shuffle !")]}) : "";
                }
            } 
            catch(err2) {
                client.emit(WSBotErrorEvent.COMMANDE_EXECUTE,commande,err2);
            }

        } catch(err) {
            client.emit(WSBotErrorEvent.UNKNOWN_ERROR,commande,err);
        }  
    }

    public help(): MessageEmbed {
        return EmbedUtil.helpMessage("Shuffle",null,null,this.description);
    }
}