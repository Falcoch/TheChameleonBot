import { Client, Message, MessageEmbed, Permissions, TextChannel } from "discord.js";
import { ChameleonChannelListener } from "../../bot/ChameleonChannelListener";
import { WSBotChannelErrorEvent } from "../../bot/WSBotErrorEvent";
import { BasicChannelListener } from "../../event/BasicChannelListener";
import { CommandeUtils } from "../../util/CommandeUtil";
import { EmbedUtil } from "../../util/EmbedUtil";
import { ChameleonChannelEmoji, ChameleonEmoji, EmojiUtils } from "../../util/EmojiUtils";
import { BasicCommande } from "../BasicCommande";

export class Setup implements BasicCommande {

    commandeName: string[];

    activated: boolean;
    adminOnly: boolean;
    secret: boolean;

    description: string;

    channelListener : BasicChannelListener

    public constructor(channelListen : BasicChannelListener,activate : boolean ,admOnly : boolean) {
        this.commandeName = ['setup','autosetup'];
        this.activated = activate;
        this.adminOnly = admOnly;
        this.description = "Setup TheChameleonBot for use a personnal channel to listen what song add the queue instead use commande.";

        this.channelListener = channelListen;
    }

    public async execute(client: Client<boolean>, commande: Message): Promise<void> {
        try {
            const args : string[] = CommandeUtils.getArgument(commande.content);

            args[1] == null || args[1] == "" || args[1] == " " ? args[1] = "Chameleon-Request" : "";
            try {
                let chameleonChannel : TextChannel = await commande.guild.channels.create(args[1],{
                    type : "GUILD_TEXT",
                    permissionOverwrites : [{
                        id : commande.guild.roles.everyone,
                        allow : [
                                Permissions.FLAGS.VIEW_CHANNEL,Permissions.FLAGS.SEND_MESSAGES, 
                                Permissions.FLAGS.READ_MESSAGE_HISTORY,Permissions.FLAGS.ADD_REACTIONS
                                ],
                        deny : [
                            Permissions.FLAGS.CREATE_PUBLIC_THREADS,Permissions.FLAGS.CREATE_PRIVATE_THREADS,
                            Permissions.FLAGS.SEND_TTS_MESSAGES,Permissions.FLAGS.ATTACH_FILES,Permissions.FLAGS.MENTION_EVERYONE,
                            Permissions.FLAGS.SEND_MESSAGES_IN_THREADS
                            ]
                    }]
                });

                chameleonChannel.setTopic("Welcome in the chameleon zone, put " + ChameleonChannelEmoji.PAUSE + " to pause/resume a song, put " + ChameleonChannelEmoji.STOP +" to stop a song, put " + ChameleonChannelEmoji.SKIP + " to skip a song, put " + ChameleonChannelEmoji.LOOP + " to loop a song, put " + ChameleonChannelEmoji.SHUFFLE + " to shuffle the current song queue.");

                if(!this.channelListener.linkToChannel(chameleonChannel))
                    client.emit(WSBotChannelErrorEvent.CHANNEL_LINKING,commande);
                
                this.channelListener.update(commande.guild.id);
                commande.react(EmojiUtils.getEmojiID(ChameleonEmoji.NICE));

                //!-----
                (this.channelListener as ChameleonChannelListener).save();
                //!----
            }
            catch(err2) {
                client.emit(WSBotChannelErrorEvent.CHANNEL_CREATION,err2);
            }
        }
        catch(err) {
            client.emit(WSBotChannelErrorEvent.CHANNEL_UNKNOWN_ERROR,commande,err);
        }
    }

    public help(): MessageEmbed {
        let args = 
        [
            "Channel Name"
        ];

        let argsDesc = 
        [
            "The name of TheChameleonBot personnal channel."
        ];

        return EmbedUtil.helpMessage("Setup",this.commandeName,args,argsDesc,this.description);
    }
}