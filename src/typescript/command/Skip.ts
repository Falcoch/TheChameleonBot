import { CommandeUtils } from "../util/CommandeUtil";
import { BasicCommande } from "./BasicCommande";
import { Client, Message, MessageEmbed } from "discord.js";
import { WSBotErrorEvent } from "../bot/WSBotErrorEvent";
import { EmbedUtil } from "../util/EmbedUtil";
import { Queue } from "discord-music-player";
import { ChameleonEmoji } from "../util/EmojiUtils";

export class Skip implements BasicCommande {

    commandeName : string[];
    activated : boolean;
    adminOnly : boolean;
    secret : boolean;
    description: string;

    public constructor(active : boolean, admOnly : boolean) {
        this.activated = active
        this.adminOnly = admOnly
        this.secret = false;
        this.commandeName = ['skip'];
        this.description = "Allow you to skip the crurrent music.";
    }

    public async execute(client: Client<boolean>, commande: Message, silent : boolean): Promise<void> {
        try {
            const args : string[] = CommandeUtils.getArgument(commande.content);
            //@ts-ignore
            let queue : Queue = client.player.getQueue(commande.guild.id);
            if(queue != null) {
                if(args[1] == null || args[1] == '1') {
                    !silent ?commande.channel.send({embeds : [EmbedUtil.normalMessage("Skip","Now skipping + 『" + queue.nowPlaying.name + "』 !")]}) : "";
                    queue.skip();
                } else {

                    let nbSkip = 1;
                    Number(args[1]) > queue.songs.length ? nbSkip = queue.songs.length : nbSkip = Number(args[1]);
                    queue.skip(nbSkip);
                    commande.react(ChameleonEmoji.NICE);
                }
            }
            else {
                commande.channel.send({embeds : [EmbedUtil.normalMessage("Skip","There is nothing to skip !")]});
            }

        } catch(err) {
            client.emit(WSBotErrorEvent.COMMANDE_EXECUTE,this.commandeName[0],err,commande.channel);
            return null;
        }

    }

    public help() : MessageEmbed {
        let args = 
        [
            "(optional) - Number of skip"
        ];

        let argsDesc = 
        [
            "Num of song you gonna skip"
        ];

        return EmbedUtil.helpMessage("Skip",this.commandeName,args,argsDesc,this.description);
    }
}