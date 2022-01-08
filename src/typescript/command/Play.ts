import { Client,Message,MessageEmbed,VoiceChannel,StageChannel } from "discord.js";
import { DefaultPlayOptions, Playlist, Queue, Song } from "discord-music-player";
import { WSBotErrorEvent } from "../bot/WSBotErrorEvent";
import { CommandeUtils } from "../util/CommandeUtil";
import { BasicCommande } from "./BasicCommande";
import ytdl from "ytdl-core";
import ytpl from "ytpl";
import { EmbedUtil } from "../util/EmbedUtil";

export class Play implements BasicCommande {
    
    commandeName : string[];
    activated : boolean;
    adminOnly : boolean;
    secret : boolean;
    description: string;

    public constructor(active : boolean, admOnly : boolean) {
        this.activated = active
        this.adminOnly = admOnly
        this.secret = false;
        this.commandeName = ['play','playing'];
        this.description = "This commande allow you to play music.";
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
                    song = await queue.play(args[1].split('&')[0]);
                    queue.songs.length >= 1 
                    ? 
                    commande.channel.send({embeds : [EmbedUtil.playingSongMessage(commande.author.username,song)] })
                    :
                    commande.channel.send({embeds : [EmbedUtil.addSongToQueueMessage(commande.author.username,song)] });
                }
                else if(ytpl.validateID(await ytpl.getPlaylistID(args[1])) || false) {
                    song = await queue.playlist(args[1]);
                    console.log(ytdl.validateURL(args[1]) + "-playlist");
                    queue.songs.length >= 1 
                    ?
                    commande.channel.send({embeds : [EmbedUtil.playingPlaylistMessage(commande.author.username,song)] })
                    :
                    commande.channel.send({embeds : [EmbedUtil.addPlaylistToQueueMessage(commande.author.username,song)] });
                }
            } 
            catch(err2) { 
                try {
                    let research : string = "";
                    for(let i = 1;i < args.length;i++)
                        research += (" " + args[i]);

                    song = await queue.play(research,DefaultPlayOptions);
                    queue.songs.length >= 1 
                    ? 
                    commande.channel.send({embeds : [EmbedUtil.playingSongMessage(commande.author.username,song)] })
                    :
                    commande.channel.send({embeds : [EmbedUtil.addSongToQueueMessage(commande.author.username,song)] });
                } 
                catch (err3) {
                    client.emit(WSBotErrorEvent.CANNOT_LOAD_SONG,args[0],commande.content);
                    return null;
                }
            }
        } catch(err) {
            client.emit(WSBotErrorEvent.UNKNOWN_ERROR);
            return null;
        }
    }

    public help() : MessageEmbed {
        let args = 
        [
            "Song Link / Playlist Link / Sentence"
        ];

        let argsDesc = 
        [
            "What the bot gonna play."
        ];

        return EmbedUtil.helpMessage("Play",args,argsDesc,this.description);
    }
}