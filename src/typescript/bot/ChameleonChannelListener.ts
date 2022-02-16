import { Queue, Song } from "discord-music-player";
import { Client, Message, TextChannel } from "discord.js";
import { Setup } from "../command/channel/Setup";
import { CommandeRegister } from "../command/register/CommandeRegister";
import { BasicChannelListener, PanelButtonKey } from "../event/BasicChannelListener";
import { ConsoleUtils } from "../util/ConsoleUtils";
import { EmbedUtil } from "../util/EmbedUtil";
import { ChameleonChannelEmoji, EmojiUtils } from "../util/EmojiUtils";
import { WSBotChannelErrorEvent } from "./WSBotErrorEvent";
import { FileOutputUtil } from "../util/FileOutputUtils";
import  dotenv from 'dotenv'
 
export class ChameleonChannelListener extends BasicChannelListener {

    private _queue : Map<string,Message<boolean>>;
    private _pannel : Map<string,Message<boolean>>;

    public constructor(client : Client,commandeManager : CommandeRegister,commandeIdentifier : string) {
        super(client,commandeManager,commandeIdentifier);
        this._queue = new Map<string,Message<boolean>>();
        this._pannel = new Map<string,Message<boolean>>();
        ConsoleUtils.logSuccess("Loading channel commandes")
    }

    public haveSetupChannel(guidID : string) {
        let result : Boolean = false;
        this._channel.get(guidID) != null ?  result = true : "";
        return result;
    }

    public callCommande(message: Message<boolean>): boolean {

        var result : boolean = false;
        if(message.content.startsWith(this._commandeIdentifier)) {
            message.content = message.content.split(this._commandeIdentifier)[1];
            this._commandeManager.callCommande(this._client,message,true);
            result = true;
        }
        else {
            message.content = "play " + message.content;
            this._commandeManager.callCommande(this._client,message,true) ? result = true : result = false;
        }
        message.delete();
        this.update(message.guild.id);
        return result;
    }

    protected _initChannelCommande(): void {
        this._commandeManager.addCommande(new Setup(this,true,false));
    }

    protected _initPannelCommande(): void {
        this._messageCommande.set(PanelButtonKey.PAUSE,this._commandeManager.getCommandeByName('pause')[0]);
        this._messageCommande.set(PanelButtonKey.STOP,this._commandeManager.getCommandeByName('stop')[0]);
        this._messageCommande.set(PanelButtonKey.SKIP,this._commandeManager.getCommandeByName('skip')[0]);
        this._messageCommande.set(PanelButtonKey.LOOP_MODE,this._commandeManager.getCommandeByName('loop')[0]);
        this._messageCommande.set(PanelButtonKey.SHUFFLE_MODE,this._commandeManager.getCommandeByName('shuffle')[0]);
    }

    protected async _pannelMessage(guildID : string): Promise<void> {
        //@ts-ignore
        let queue : Queue = this._client.player.createQueue(guildID);
        let tmp : Message<boolean> = await this._channel.get(guildID).send({embeds : [queue.isPlaying ? EmbedUtil.channelMessage(queue.nowPlaying) : EmbedUtil.channelMessage(null)]});
        this._pannel.set(guildID,tmp);

        if(this._messageCommande.get(PanelButtonKey.PAUSE) != null)
            this._pannel.get(guildID).react(ChameleonChannelEmoji.PAUSE);

        if(this._messageCommande.get(PanelButtonKey.STOP) != null)
            this._pannel.get(guildID).react(ChameleonChannelEmoji.STOP);

        if(this._messageCommande.get(PanelButtonKey.SKIP) != null)
            this._pannel.get(guildID).react(ChameleonChannelEmoji.SKIP);

        if(this._messageCommande.get(PanelButtonKey.LOOP_MODE) != null)
            this._pannel.get(guildID).react(ChameleonChannelEmoji.LOOP);

        if(this._messageCommande.get(PanelButtonKey.SHUFFLE_MODE) != null)
            this._pannel.get(guildID).react(ChameleonChannelEmoji.SHUFFLE);

        const f = (reaction, user) => {
            return  !user.bot && (reaction.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.PAUSE) || reaction.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.STOP) || reaction.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.SKIP) || reaction.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.LOOP) || reaction.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.SHUFFLE));
        };

        const collector = this._pannel.get(guildID).createReactionCollector({ filter : f});
        collector.on('collect', async (r,u) => {
            if(this._messageCommande.get(PanelButtonKey.PAUSE) != null) {
                if(r.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.PAUSE)) { 
                    await this._messageCommande.get(PanelButtonKey.PAUSE).execute(this._client,this._pannel.get(guildID),true);
                    this.update(guildID);
                }
            }

            if(this._messageCommande.get(PanelButtonKey.STOP) != null) {
                if(r.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.STOP)) { 
                    await this._messageCommande.get(PanelButtonKey.STOP).execute(this._client,this._pannel.get(guildID),true);
                    this.update(guildID);
                }
            }

            if(this._messageCommande.get(PanelButtonKey.SKIP) != null) {
                if(r.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.SKIP)) { 
                    await this._messageCommande.get(PanelButtonKey.SKIP).execute(this._client,this._pannel.get(guildID),true);
                    this.update(guildID);
                }
            }

            if(this._messageCommande.get(PanelButtonKey.LOOP_MODE) != null) {
                if(r.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.LOOP)) { 
                    await this._messageCommande.get(PanelButtonKey.LOOP_MODE).execute(this._client,this._pannel.get(guildID),true);
                    this.update(guildID);
                }
            }

            if(this._messageCommande.get(PanelButtonKey.SHUFFLE_MODE) != null) {
                if(r.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.SHUFFLE)) { 
                    await this._messageCommande.get(PanelButtonKey.SHUFFLE_MODE).execute(this._client,this._pannel.get(guildID),true);
                    this.update(guildID);
                }
            }
        });
    }

    public async update(guildID : string): Promise<void> {
        try {
            await this.updatePannel(guildID);

            //@ts-ignore
            let queue : Queue = this._client.player.createQueue(guildID);
            let queueList : string = "\n**__Queue :__**\n┐";
        
            queueList = "\n**__Queue :__**\n┐";
            if(queue.songs.length > 0) {
                for(let i = 0 ; i < queue.songs.length ; i++) {
                    i == 0 ? queueList += ("\n | :star: " + (i+1) +  ". " + queue.songs[i].name) : queueList += ("\n | " + (i+1) +  ". " + queue.songs[i].name);
                    if(i>=16) {
                        queueList += "\n | ... ("+ ((queue.songs.length+1)-i) + ")";
                        break;
                    }
                }
            } else {
                queueList += "\n | *(empty)*";
            }

            queueList += "\n┘\n";
            if(this._queue.get(guildID) == null) {
                let tmp : Message<boolean> = await this._channel.get(guildID).send(queueList);
                this._queue.set(guildID,tmp);

            } else {
                this._queue.get(guildID).edit(queueList);
                
            }
            
        } catch(err) {
            this._client.emit(WSBotChannelErrorEvent.CHANNEL_UPDATE,err);
        }
    }

    public async updatePannel(guildID : string) : Promise<void> {
        if(this._pannel.get(guildID) == null) {
            await this._pannelMessage(guildID);
        }
        

        //@ts-ignore
        let queue : Queue = this._client.player.createQueue(this._channel.get(guildID).guild.id);
        let i : number = 0; 

        while (i <= 8) {
            if(queue.isPlaying) {
                await this.delay(600);
                this._pannel.get(guildID).edit({ embeds : [EmbedUtil.channelMessage(queue.nowPlaying)]});
                break;
            }
            else {
                this._pannel.get(guildID).edit({embeds : [EmbedUtil.channelMessage(null)]});
            }
            await this.delay(600);
            i++;
        }
    }

    private delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    public save() {
        dotenv.config();
        this._channel.forEach((value : TextChannel, key : String) => {
            FileOutputUtil.save(process.env.DATA_PATH,value.guild.name,value.guild.id,value.id);
        });
    }

    public erase(serverID : string) {
        dotenv.config();
        FileOutputUtil.erase(process.env.DATA_PATH,serverID);
    }

    public readSave() {
        dotenv.config();
        const data = FileOutputUtil.getAll(process.env.DATA_PATH);
        if(data != undefined) {
            data.forEach(async guild => {
                let textChannel : TextChannel =  (this._client.channels.cache.get(guild.ChannelId) as TextChannel);
                this._channel.set(guild.Id, textChannel);
                textChannel.bulkDelete(25);
                this.update(textChannel.guild.id);
            });
        }
    }
}