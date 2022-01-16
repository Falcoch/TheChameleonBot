import { Queue } from "discord-music-player";
import { Client, Message, MessageEmbed } from "discord.js";
import { WSBotErrorEvent } from "../bot/WSBotErrorEvent";
import { CommandeUtils } from "../util/CommandeUtil";
import { EmbedUtil } from "../util/EmbedUtil";
import { BasicCommande } from "./BasicCommande";

export class Info implements BasicCommande {

    commandeName: string[];
    
    activated: boolean;
    adminOnly: boolean;
    secret: boolean;

    description: string;

    public constructor(active : boolean, admOnly : boolean) {
        this.commandeName = ['info','infosong','songinfo','currentinfo','currentsong'];
        this.activated = active;
        this.adminOnly = admOnly;
        this.secret = false;

        this.description = "Show you all info about a song."
    }

    public async execute(client: Client<boolean>, commande: Message<boolean>, silent: boolean): Promise<void> {
        try {
            const args : string[] = CommandeUtils.getArgument(commande.content);

            //@ts-ignore
            let queue : Queue = client.player.getQueue(commande.guild.id);
            let songNo : number = 0;
            if(args[1] == null || args[1] == ' ' || args[1] == '0') {
                commande.channel.send({embeds : [EmbedUtil.infoSong(queue.nowPlaying)]});
            } 
            else {
                songNo = Number(args[1])-1;
                if(songNo > queue.songs.length) {
                    commande.channel.send({embeds : [EmbedUtil.errorMessage("Cannot find this sog in the queue !")]});
                }
                else {
                    commande.channel.send({embeds : [EmbedUtil.infoSong(queue.songs[songNo])]});
                }

                    
            }
        }
        catch(err) {
            client.emit(WSBotErrorEvent.COMMANDE_EXECUTE,this.commandeName,err,commande.channel);
        }
    }

    public help(): MessageEmbed {
        let args = 
        [
            "The song number"
        ];

        let argsDesc = 
        [
            "The song number in the queue order."
        ];

        return EmbedUtil.helpMessage("Info",this.commandeName,args,argsDesc,this.description);
    }
}