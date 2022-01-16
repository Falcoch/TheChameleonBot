import { Client, Message, MessageEmbed, RichPresenceAssets } from "discord.js";
import { CommandeUtils } from "../util/CommandeUtil";
import { BasicCommande } from "./BasicCommande";
import { Queue, Song } from "discord-music-player";
import { EmbedUtil } from "../util/EmbedUtil";
import { ChameleonEmoji, EmojiUtils } from "../util/EmojiUtils";
import { WSBotErrorEvent } from "../bot/WSBotErrorEvent";

export class List implements BasicCommande {

    commandeName: string[];
    activated: boolean;
    adminOnly: boolean;
    secret: boolean;
    description: string;

    maxSongShowing : number;

    public constructor(songShowing : number, active : boolean, admOnly : boolean) {
        this.activated = active;
        this.adminOnly = admOnly;
        this.secret = false;
        this.commandeName = ['queue','list'];
        this.description = "Allow you to see all song in the queue";

        this.maxSongShowing = songShowing;
    }

    public async execute(client: Client<boolean>, commande: Message, silent : boolean): Promise<void> {
        try {
            const args : string[] = CommandeUtils.getArgument(commande.content);
            //@ts-ignore
            let queue : Queue = client.player.getQueue(commande.guild.id);
            let showing = this.maxSongShowing;

            if(queue != null) {

                let page : number = 0;
                let pageMax = 0;
                var i = 0;
                while(i < queue.songs.length) {
                    i++;
                    if(i%showing == 0)
                        pageMax++
                }
                
                args[1] == null || args[1] == "" || args[1] == " " || args[1] == "0" ? page = 0 : page = Number(args[1])-1; 

                let queueMessage : Message = await commande.channel.send({embeds : [EmbedUtil.queuePage(this._makeList(page,showing,queue.songs),page+1)]});
                queueMessage.react(ChameleonEmoji.LEFT_ARROW);
                queueMessage.react(ChameleonEmoji.RIGHT_ARROW);

                const f = (reaction, user) => {
                    return  !user.bot && (reaction.emoji.id == EmojiUtils.getEmojiID(ChameleonEmoji.LEFT_ARROW) || reaction.emoji.id == EmojiUtils.getEmojiID(ChameleonEmoji.RIGHT_ARROW));
                };

                const collector = queueMessage.createReactionCollector({ filter : f,max: 255,time: 120000});

                collector.on('collect', (r,u) => {

                    if(r.emoji.id == EmojiUtils.getEmojiID(ChameleonEmoji.LEFT_ARROW)) { 
                        page-1 < 0 ? page = pageMax : page -= 1;
                    }

                    if(r.emoji.id == EmojiUtils.getEmojiID(ChameleonEmoji.RIGHT_ARROW)) {
                        page += 1;
                    }

                    page = page%(pageMax+1);

                    queueMessage.edit({embeds : [EmbedUtil.queuePage(this._makeList(page,showing,queue.songs),page+1)]});
                });
            }

        } catch(err) {
            client.emit(WSBotErrorEvent.COMMANDE_EXECUTE,commande,err,commande.channel);
        }
        
    }

    public help(): MessageEmbed {
        let args = 
        [
            "Page Number"
        ];

        let argsDesc = 
        [
            "The page of the queue you want to see."
        ];

        return EmbedUtil.helpMessage("Help",this.commandeName,args,argsDesc,this.description);
    }

    private _makeList(page : number,showing : number,content : Song[]) : string {
        
        let messageList : string = "```";
        for(let i = this.maxSongShowing*page; i < (this.maxSongShowing*page)+showing;i++) {
            if(content[i] != null) {
                var number : number = i + 1;
                messageList += (number + ". " + content[i].name + "\n");
            }
        }
        messageList += "```";

        return messageList;
    }
}