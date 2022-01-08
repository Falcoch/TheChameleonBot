import { Client,Message,TextBasedChannels,VoiceChannel,StageChannel } from "discord.js";
import { DefaultPlayOptions, Playlist, Queue, Song } from "discord-music-player";
import { WSBotErrorEvent } from "../bot/WSBotErrorEvent";
import { CommandeUtils } from "../util/CommandeUtil";
import { BasicCommande } from "./BasicCommande";
import ytdl from "ytdl-core";
import ytpl from "ytpl";

export class Play implements BasicCommande {
    
    commandeName: string[];
    activated: boolean;
    adminOnly: boolean;
    secret: boolean;

    public constructor(active : boolean, admOnly : boolean) {
        this.activated = active
        this.adminOnly = admOnly
        this.secret = false;
        this.commandeName = ['play','playing'];
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
                    song = await queue.play(args[1]);
                      
                }
                else if(ytpl.validateID(await ytpl.getPlaylistID(args[1])) || false) {
                    song = await queue.playlist(args[1]); 
                }
            } 
            catch(err2) { 
                try {
                    let research : string = "";
                    for(let i = 1;i < args.length;i++)
                        research += (" " + args[i]);

                    song = await queue.play(research,DefaultPlayOptions);
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

    public help(channel: TextBasedChannels) : void {
        
    }
}