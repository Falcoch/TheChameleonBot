import { Queue, RepeatMode } from "discord-music-player";
import { Client, Message, MessageEmbed } from "discord.js";
import { WSBotErrorEvent } from "../bot/WSBotErrorEvent";
import { EmbedUtil } from "../util/EmbedUtil";
import { BasicCommande } from "./BasicCommande";

export class LoopSong implements BasicCommande {
    
    commandeName: string[];

    activated: boolean;
    adminOnly: boolean;
    secret: boolean;

    description: string;

    public constructor(active : boolean, admOnly : boolean) {
        this.commandeName = ['loop','loopcurrent','loopsong'];
        this.activated = active;
        this.adminOnly = admOnly;
        this.secret = false;

        this.description = "Allow you to loop ** the current** playing song";
    }

    public async execute(client: Client<boolean>, commande: Message<boolean>, silent : boolean): Promise<void> {
        try {
            //@ts-ignore
            let queue : Queue = client.player.getQueue(commande.guild.id);

            try {
                if(queue != null) {
                    if(queue.repeatMode == RepeatMode.SONG) {
                        queue.setRepeatMode(RepeatMode.DISABLED);
                        !silent ?commande.channel.send({embeds: [EmbedUtil.normalMessage("Loop","Loop mode disabled")]}) : "";
                    }
                    else {
                        queue.setRepeatMode(RepeatMode.SONG);
                        !silent ?commande.channel.send({embeds: [EmbedUtil.normalMessage("Loop","Song loop mode enabled")]}) : "";
                    }
                }
                else {
                    !silent ?commande.channel.send({embeds : [EmbedUtil.normalMessage("Loop","There is nothing to loop !")]}) : "";
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
        return EmbedUtil.helpMessage("Loop",null,null,this.description);
    }
}