import { Queue, Song } from "discord-music-player";
import { Channel, Client, Message } from "discord.js";
import { Setup } from "../command/channel/Setup";
import { CommandeRegister } from "../command/register/CommandeRegister";
import { BasicChannelListener, PanelButtonKey } from "../event/BasicChannelListener";
import { ConsoleUtils } from "../util/ConsoleUtils";
import { EmbedUtil } from "../util/EmbedUtil";
import { ChameleonChannelEmoji, EmojiUtils } from "../util/EmojiUtils";
import { TheChameleonBotEventListener } from "./ChameleonEventListener";
import { WSBotChannelErrorEvent } from "./WSBotErrorEvent";

export class ChameleonChannelListener extends BasicChannelListener {

    private _queue : Message;
    private _pannel : Message;

    public constructor(client : Client,commandeManager : CommandeRegister,commandeIdentifier : string) {
        super(client,commandeManager,commandeIdentifier);
        ConsoleUtils.logSuccess("Loading channel commandes")
    }

    public callCommande(message: Message<boolean>): boolean {

        var result : boolean = false;
        if(message.content.startsWith(this._commandeIdentifier)) {
            if(this._doubleListen == false) {
                message.content = message.content.split(this._commandeIdentifier)[1];
                this._commandeManager.callCommande(this._client,message,true);
            }
            result = true;
        } else {
            message.content = "play " + message.content;
            this._commandeManager.callCommande(this._client,message,true) ? result = true : result = false;
        }
        message.delete();
        this.update();
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

    protected async _pannelMessage(): Promise<void> {
        
        //@ts-ignore
        let queue : Queue = this._client.player.createQueue(this._channel.guild.id);
         
        this._pannel = await this._channel.send({embeds : [queue.isPlaying ? EmbedUtil.channelMessage(queue.nowPlaying) : EmbedUtil.channelMessage(null)]});

        if(this._messageCommande.get(PanelButtonKey.PAUSE) != null)
            this._pannel.react(ChameleonChannelEmoji.PAUSE);

        if(this._messageCommande.get(PanelButtonKey.STOP) != null)
            this._pannel.react(ChameleonChannelEmoji.STOP);

        if(this._messageCommande.get(PanelButtonKey.SKIP) != null)
            this._pannel.react(ChameleonChannelEmoji.SKIP);

        if(this._messageCommande.get(PanelButtonKey.LOOP_MODE) != null)
            this._pannel.react(ChameleonChannelEmoji.LOOP);

        if(this._messageCommande.get(PanelButtonKey.SHUFFLE_MODE) != null)
            this._pannel.react(ChameleonChannelEmoji.SHUFFLE);

        const f = (reaction, user) => {
            return  !user.bot && (reaction.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.PAUSE) || reaction.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.STOP) || reaction.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.SKIP) || reaction.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.LOOP) || reaction.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.SHUFFLE));
        };

        const collector = this._pannel.createReactionCollector({ filter : f});

        collector.on('collect', async (r,u) => {
            if(this._messageCommande.get(PanelButtonKey.PAUSE) != null) {
                if(r.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.PAUSE)) { 
                    await this._messageCommande.get(PanelButtonKey.PAUSE).execute(this._client,this._pannel,true);
                    this.update();
                }
            }

            if(this._messageCommande.get(PanelButtonKey.STOP) != null) {
                if(r.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.STOP)) { 
                    await this._messageCommande.get(PanelButtonKey.STOP).execute(this._client,this._pannel,true);
                    this.update();
                }
            }

            if(this._messageCommande.get(PanelButtonKey.SKIP) != null) {
                if(r.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.SKIP)) { 
                    await this._messageCommande.get(PanelButtonKey.SKIP).execute(this._client,this._pannel,true);
                    this.update();
                }
            }

            if(this._messageCommande.get(PanelButtonKey.LOOP_MODE) != null) {
                if(r.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.LOOP)) { 
                    await this._messageCommande.get(PanelButtonKey.LOOP_MODE).execute(this._client,this._pannel,true);
                    this.update();
                }
            }

            if(this._messageCommande.get(PanelButtonKey.SHUFFLE_MODE) != null) {
                if(r.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.SHUFFLE)) { 
                    await this._messageCommande.get(PanelButtonKey.SHUFFLE_MODE).execute(this._client,this._pannel,true);
                    this.update();
                }
            }
        });  
    }

    public async update(): Promise<void> {
        try {
            await this.updatePannel();

            //@ts-ignore
            let queue : Queue = this._client.player.createQueue(this._channel.guild.id);
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
            
            if(this._queue == null) {
                this._queue = await this._channel.send(queueList);

            } else {
                this._queue.edit(queueList);
            }
        } catch(err) {
            this._client.emit(WSBotChannelErrorEvent.CHANNEL_UPDATE,err);
        }
    }

    public async updatePannel() : Promise<void> {
        
        if(this._pannel == null) {
            await this._pannelMessage();
        }

        //@ts-ignore
        let queue : Queue = this._client.player.createQueue(this._channel.guild.id);
        let i : number = 0; 

        while (i <= 8) {
            if(queue.isPlaying) {
                await this.delay(1000);
                this._pannel.edit({ embeds : [EmbedUtil.channelMessage(queue.nowPlaying)]});
                break;
            }
            else {
                this._pannel.edit({embeds : [EmbedUtil.channelMessage(null)]});
            }
            await this.delay(1000);
            i++;
        }
    }

    private delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
}