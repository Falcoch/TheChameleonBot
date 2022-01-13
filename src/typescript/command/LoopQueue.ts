import { Queue, RepeatMode } from "discord-music-player";
import { Client, Message, MessageEmbed } from "discord.js";
import { WSBotErrorEvent } from "../bot/WSBotErrorEvent";
import { EmbedUtil } from "../util/EmbedUtil";
import { BasicCommande } from "./BasicCommande";

export class LoopQueue implements BasicCommande {
    
    commandeName: string[];

    activated: boolean;
    adminOnly: boolean;
    secret: boolean;

    description: string;

    public constructor(active : boolean, admOnly : boolean) {
        this.commandeName = ['queueloop','loopall','looplist'];
        this.activated = active;
        this.adminOnly = admOnly;
        this.secret = false;

        this.description = "Allow you to loop queue";
    }

    public async execute(client: Client<boolean>, commande: Message<boolean>, silent : boolean): Promise<void> {
        try {
            //@ts-ignore
            let queue : Queue = client.player.getQueue(commande.guild.id);

            try {
                if(queue != null) {
                    if(queue.repeatMode == RepeatMode.QUEUE) {
                        queue.setRepeatMode(RepeatMode.DISABLED);
                        silent  ? commande.channel.send({embeds: [EmbedUtil.normalMessage("Loop","Loop mode disabled")]}) : "";
                    }
                    else {
                        queue.setRepeatMode(RepeatMode.QUEUE);
                        !silent ?commande.channel.send({embeds: [EmbedUtil.normalMessage("Loop","Queue loop mode enabled")]}) : "";
                    }
                }
                else {
                    !silent ?commande.channel.send({embeds : [EmbedUtil.normalMessage("Queue Loop","There is nothing to loop !")]}) : "";
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
        return EmbedUtil.helpMessage("Queueloop",null,null,this.description);
    }
}