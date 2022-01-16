import { Queue } from "discord-music-player";
import { Client, Message, MessageEmbed } from "discord.js";
import { WSBotErrorEvent } from "../bot/WSBotErrorEvent";
import { CommandeUtils } from "../util/CommandeUtil";
import { EmbedUtil } from "../util/EmbedUtil";
import { ChameleonEmoji } from "../util/EmojiUtils";
import { BasicCommande } from "./BasicCommande";

export class Pause implements BasicCommande {

    commandeName : string[];
    activated : boolean;
    adminOnly : boolean;
    secret : boolean;
    description: string;

    state : boolean = false;

    public constructor(active : boolean, admOnly : boolean) {
        this.activated = active
        this.adminOnly = admOnly
        this.secret = false;
        this.commandeName = ['pause'];
        this.description = "Allow you to pause the crurrent song and unpause it if the song is already paused.";
        this.state = false;
    }

    public async execute(client: Client<boolean>, commande: Message, silent : boolean): Promise<void> {
        try {
            const args : string[] = CommandeUtils.getArgument(commande.content);
            //@ts-ignore
            let queue : Queue = client.player.getQueue(commande.guild.id);
            if(queue != null) {
                this.state = !this.state;
                queue.setPaused(this.state);
                commande.react(ChameleonEmoji.NICE);
            }
            else {
                !silent ?commande.channel.send({embeds : [EmbedUtil.normalMessage("Pause","There is nothing to pause !")]}) : "";
            }
        } catch(err) {
            client.emit(WSBotErrorEvent.COMMANDE_EXECUTE,this.commandeName[0],err,commande.channel);
            return null;
        }
    }

    public help() : MessageEmbed {
        return EmbedUtil.helpMessage("Pause",this.commandeName,null,null,this.description);
    }
}