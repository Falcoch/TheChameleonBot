import { Song } from "discord-music-player";
import { Client, Message } from "discord.js";
import { Setup } from "../command/channel/Setup";
import { CommandeRegister } from "../command/register/CommandeRegister";
import { BasicChannelListener, PanelButtonKey } from "../event/BasicChannelListener";
import { ConsoleUtils } from "../util/ConsoleUtils";
import { EmbedUtil } from "../util/EmbedUtil";
import { ChameleonChannelEmoji, EmojiUtils } from "../util/EmojiUtils";

export class ChameleonChannelListener extends BasicChannelListener {

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
                result = true;
            }
        } else {
            message.content = "play " + message.content;
            this._commandeManager.callCommande(this._client,message,true) ? result = true : result = false;
        }
        
        return result;
    }

    protected _initChannelCommande(): void {
        this._commandeManager.addCommande(new Setup(this,true,false));
    }

    protected _initPannelCommande(): void {
        this._messageCommande.set(PanelButtonKey.PAUSE,this._commandeManager.getCommandeByName('pause')[0]);
        this._messageCommande.set(PanelButtonKey.STOP,this._commandeManager.getCommandeByName('stop')[0]);
        this._messageCommande.set(PanelButtonKey.SKIP,this._commandeManager.getCommandeByName('skip')[0]);
        //this._messageCommande.set(PanelButtonKey.LOOP_MODE,this._commandeManager.getCommandeByName('play')[0]);
        //this._messageCommande.set(PanelButtonKey.SHUFFLE_MODE,this._commandeManager.getCommandeByName('play')[0]);
    }

    protected async _pannelMessage(currentSong : Song): Promise<void> {
        
        let tmp : EmbedUtil = EmbedUtil.channelMessage(currentSong);
        let message : Message = await this._channel.send({embeds : [tmp]});

        if(this._messageCommande.get(PanelButtonKey.PAUSE) != null)
            message.react(ChameleonChannelEmoji.PAUSE);

        if(this._messageCommande.get(PanelButtonKey.STOP) != null)
            message.react(ChameleonChannelEmoji.STOP);

        if(this._messageCommande.get(PanelButtonKey.SKIP) != null)
            message.react(ChameleonChannelEmoji.SKIP);

        if(this._messageCommande.get(PanelButtonKey.LOOP_MODE) != null)
            message.react(ChameleonChannelEmoji.LOOP);

        if(this._messageCommande.get(PanelButtonKey.SHUFFLE_MODE) != null)
            message.react(ChameleonChannelEmoji.SHUFFLE);

        const f = (reaction, user) => {
            return  !user.bot && (reaction.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.PAUSE) || reaction.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.STOP) || reaction.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.SKIP) || reaction.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.LOOP) || reaction.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.SHUFFLE));
        };

        const collector = message.createReactionCollector({ filter : f});

        collector.on('collect', (r,u) => {

            if(this._messageCommande.get(PanelButtonKey.PAUSE) != null) {
                if(r.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.PAUSE)) { 
                    this._messageCommande.get(PanelButtonKey.PAUSE).execute(this._client,message,true);
                }
            }

            if(this._messageCommande.get(PanelButtonKey.STOP) != null) {
                if(r.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.STOP)) { 
                    this._messageCommande.get(PanelButtonKey.STOP).execute(this._client,message,true);
                }
            }

            if(this._messageCommande.get(PanelButtonKey.SKIP) != null) {
                if(r.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.SKIP)) { 
                    this._messageCommande.get(PanelButtonKey.SKIP).execute(this._client,message,true);
                }
            }

            if(this._messageCommande.get(PanelButtonKey.LOOP_MODE) != null) {
                if(r.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.LOOP)) { 
                    this._messageCommande.get(PanelButtonKey.LOOP_MODE).execute(this._client,message,true);
                }
            }

            if(this._messageCommande.get(PanelButtonKey.SHUFFLE_MODE) != null) {
                if(r.emoji.id == EmojiUtils.getEmojiID(ChameleonChannelEmoji.SHUFFLE)) { 
                    this._messageCommande.get(PanelButtonKey.SHUFFLE_MODE).execute(this._client,message,true);
                }
            }
        });  
    }

    public update(): void {
        
    }

    public fullUpdate() {
        
    }
}