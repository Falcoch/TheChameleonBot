import { Queue } from "discord-music-player";
import { Client, Message, MessageEmbed } from "discord.js";
import { WSBotErrorEvent } from "../bot/WSBotErrorEvent";
import { CommandeUtils } from "../util/CommandeUtil";
import { EmbedUtil } from "../util/EmbedUtil";
import { ChameleonEmoji } from "../util/EmojiUtils";
import { BasicCommande } from "./BasicCommande";

export class Clear implements BasicCommande {

    commandeName : string[];
    activated : boolean;
    adminOnly : boolean;
    secret : boolean;
    description: string;

    public constructor(active : boolean, admOnly : boolean) {
        this.activated = active
        this.adminOnly = admOnly
        this.secret = false;
        this.commandeName = ['clear','skipall','end'];
        this.description = "Allow you to clear the queue.";
    }

    public async execute(client: Client<boolean>, commande: Message, silent : boolean): Promise<void> {
        try {
            const args : string[] = CommandeUtils.getArgument(commande.content);
            //@ts-ignore
            let queue : Queue = client.player.getQueue(commande.guild.id);
            if(queue != null) {
                queue.clearQueue();
                commande.react(ChameleonEmoji.NICE);
            } 
            else {
                !silent ?commande.channel.send({embeds : [EmbedUtil.normalMessage("Clear","There is nothing to clear !")]}) : "";
            }

        } catch(err) {
            client.emit(WSBotErrorEvent.COMMANDE_EXECUTE,this.commandeName[0],err,commande.channel);
            return null;
        }
    }

    public help() : MessageEmbed {
        return EmbedUtil.helpMessage("Clear",this.commandeName,null,null,this.description);
    }
}