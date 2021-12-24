import { Client,Message,TextBasedChannels,VoiceChannel,StageChannel } from "discord.js";
import { DefaultPlaylistOptions, DefaultPlayOptions, Playlist, Queue, Song, Utils } from "discord-music-player";
import { WSBotErrorEvent } from "../bot/WSBotErrorEvent";
import { CommandeUtils } from "../util/CommandeUtil";
import { BasicCommande } from "./BasicCommande";
import ytdl from "ytdl-core";
import ytpl from "ytpl";
import { MessageUtil } from "../util/MessageUtil";

export class Play implements BasicCommande {
    
    commandeName: string[];
    activated: boolean;
    adminOnly: boolean;
    secret: boolean;

    public constructor(active : boolean, admOnly : boolean) {
        this.activated = active
        this.adminOnly = admOnly
        this.secret = false;
        this.commandeName = ['play'];
    }

    public async execute(client: Client<boolean>, commande: Message): Promise<void> {
        try {
            const voiceChannel : VoiceChannel | StageChannel  = commande.member.voice.channel;
            const args : string[] = CommandeUtils.getArgument(commande.content);

            if(args[1] == null) {
                client.emit(WSBotErrorEvent.BAD_ARGS_NUMBER);
                return null;
            }

            if(!voiceChannel.permissionsFor(commande.client.user).has("CONNECT") || !voiceChannel.permissionsFor(commande.client.user).has("SPEAK")) {
                client.emit(WSBotErrorEvent.NOT_ENOUGHT_PERMISSION);
                return null;
            }

            //@ts-ignore
            let queue : Queue = client.player.createQueue(commande.guild.id);
            await queue.join(commande.member.voice.channel);
            let song : Song | Playlist = null;
            
            try {

                if(ytdl.validateURL(args[1])) {
                    console.log("Song");
                    song = await queue.play(args[1]);
                    commande.channel.send({embeds:[MessageUtil.playingSongMessage(commande.member.user.toString() ,song)]});   
                }
                else if(ytpl.validateID(await ytpl.getPlaylistID(args[1])) || false) {
                    console.log("Playlist");
                    song = await queue.playlist(args[1]); 
                    commande.channel.send({embeds:[MessageUtil.playingPlaylistMessage(commande.member.user.toString(),song)]});  
                }
            } 
            catch(err2) { 
                console.log("Sentence");
                let research : string = "";
                for(let i = 1;i < args.length;i++)
                    research += (" " + args[i]);

                song = await queue.play(research,DefaultPlayOptions);
                commande.channel.send({embeds:[MessageUtil.playingSongMessage(commande.author.username,song)]});
            } 

        } catch(err) {
            client.emit(WSBotErrorEvent.UNKNOW_ERROR);
            console.log(err);
        }
    }

    public help(channel: TextBasedChannels): void {
        
    }
}