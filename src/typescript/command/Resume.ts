import { Queue } from "discord-music-player";
import { Client, Message, MessageEmbed } from "discord.js";
import { WSBotErrorEvent } from "../bot/WSBotErrorEvent";
import { CommandeUtils } from "../util/CommandeUtil";
import { EmbedUtil } from "../util/EmbedUtil";
import { BasicCommande } from "./BasicCommande";

export class Resume implements BasicCommande {

    commandeName : string[];
    activated : boolean;
    adminOnly : boolean;
    secret : boolean;
    description: string;

    public constructor(active : boolean, admOnly : boolean) {
        this.activated = active
        this.adminOnly = admOnly
        this.secret = false;
        this.commandeName = ['resume','unpause'];
        this.description = "Allow you to unpause the crurrent music.";
    }

    public async execute(client: Client<boolean>, commande: Message, silent : boolean): Promise<void> {
        try {
            const args : string[] = CommandeUtils.getArgument(commande.content);
            //@ts-ignore
            let queue : Queue = client.player.getQueue(commande.guild.id);
            if(queue != null) {
                !silent ?commande.channel.send({embeds : [EmbedUtil.normalMessage("resume","Now resuming + 『" + queue.nowPlaying.name + "』 !")]}) : "";
                queue.setPaused(false);
            } 
            else {
                !silent ?commande.channel.send({embeds : [EmbedUtil.normalMessage("Resume","There is nothing to resume !")]}) : "";
            }

        } catch(err) {
            client.emit(WSBotErrorEvent.UNKNOWN_ERROR,this.commandeName[0],err);
            return null;
        }
    }

    public help() : MessageEmbed {
        return EmbedUtil.helpMessage("Resume",null,null,this.description);
    }
}