import { Playlist, Song } from "discord-music-player";
import { MessageEmbed,ColorResolvable } from "discord.js";
import { BasicCommande } from "../command/BasicCommande";
import { ChameleonEmoji } from "./EmojiUtils";
import { ImageUtil, PaintImage } from "./ImageUtil";

export class EmbedUtil {
    public static _botColor : ColorResolvable = '#3A051D'
    
    public static normalMessage(title : string, descrition : string) : MessageEmbed {
        const message = new MessageEmbed()
            .setColor(EmbedUtil._botColor)
            .setTitle(":star: __" + title + "__ :star:")
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setDescription(descrition);
        return message;
    }

    public static imageMessage(title : string, descrition : string,imageUrl : string) : MessageEmbed {
        const message = new MessageEmbed()
            .setColor(EmbedUtil._botColor)
            .setTitle(":star: __" + title + "__ :star:")
            .setDescription(descrition)
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setImage(imageUrl);
        return message;
    }

    public static playingSongMessage(authorUsername : string, song : Song) : MessageEmbed {
        const message = new MessageEmbed()
            .setColor(EmbedUtil._botColor)
            .setThumbnail(ImageUtil.getRandom())
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setFooter({"text" : "Requested by " + authorUsername})
            .setDescription( ChameleonEmoji.NICE + " Currently Playing :『" + song.name + "』");
            
        return message;
    }

    public static addSongToQueueMessage(authorUsername : string, song : Song) : MessageEmbed {
        const message = new MessageEmbed()
            .setColor(EmbedUtil._botColor)
            .setThumbnail(ImageUtil.getRandom())
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setDescription("Add『" + song.name + "』to queue !")
            .setFooter({"text" : "Requested by " + authorUsername})
        return message;
    }

    public static playingPlaylistMessage(authorUsername : string, playlist : Playlist) : MessageEmbed {
        const message = new MessageEmbed()
            .setColor(EmbedUtil._botColor)
            .setThumbnail(ImageUtil.getRandom())
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setDescription("Currently Playing the Playlist :『" + playlist.name + "』!")
            .setFooter({"text" : "Requested by " + authorUsername})
        return message;
    }

    public static addPlaylistToQueueMessage(authorUsername : string, playlist : Playlist) : MessageEmbed {
        const message = new MessageEmbed()
            .setColor(EmbedUtil._botColor)
            .setThumbnail(ImageUtil.getRandom())
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setDescription("Currently Playing the Playlist :『" + playlist.name + "』!")
            .setFooter({"text" : "Requested by " + authorUsername})
        return message;
    }

    public static errorMessage(description : string) : MessageEmbed {
        const message = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle(":x: __Error__ :x:")
            .setThumbnail(ImageUtil.getError())
            .setFooter({"text" : "The Chameleon Bot"})
            .setDescription(description)
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')

        return message;
    }

    public static helpMessage(cmdName : string,cmdAlias : string [], args : string[],argsDesc : string[], cmdDesc : string) : MessageEmbed {

        let argsText = cmdName;
    
        args != null ? args.forEach(a =>{ argsText += (" <" + args + ">"); }) : "";
        
        let alias : string[] = ['no-named-commande'];

        if(cmdAlias != null) {
            alias = cmdAlias;
        } 

        let aliasDesc : string = "";
        cmdAlias.forEach(a => {
            aliasDesc = a + " "
        });

        const message = new MessageEmbed() 
            .setColor(EmbedUtil._botColor)
            .setTitle(":star: __Help__ : " + cmdName + " :star:")
            .setThumbnail(ImageUtil.getHelp())
            .setFooter({"text" : "The Chameleon Bot"})
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setDescription(cmdDesc + "\n\nAlias : " + aliasDesc)
            .addFields({name : 'Usage', value : argsText});

        if(args != null && args.length >= 1) {
            if(args.length > argsDesc.length)
            {
                for(let i = 0; i < args.length - argsDesc.length; i++) {
                    argsDesc[i + argsDesc.length] = null;
                }
            }

            for(let i = 0; i < args.length; i++) {
                if(args[i] != null && args[i] != "") {
                    argsDesc[i] == null ? args[i] = "..." : "";
                    argsDesc[i] == "" ? args[i] = "..." : "";
                    
                    message.addFields({ name: args[i], value: argsDesc[i] });
                }
            }
        }

        message.setTimestamp();
        return message;
    }

    public static helpList(cmdList : BasicCommande[]) : MessageEmbed {
        const message = new MessageEmbed() 

        .setColor(EmbedUtil._botColor)
        .setTitle(":star: __Commande List__ :star:")
        .setThumbnail(ImageUtil.getHelp())
        .setFooter({"text" : "The Chameleon Bot"})
        .setTimestamp()
        .setTimestamp()
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

        let desc = "";

        if(cmdList.length >= 1)
        {
            cmdList.forEach(cmd => {
                if(cmd.description != null && cmd.description != "") {
                    desc += ("`" + cmd.commandeName[0] + "` : " + cmd.description + "\n");
                }
            });
        }
        message.setDescription(desc);
        return message;
    }

    public static changeSong(oldSong,newSong) : MessageEmbed {
        const message = new MessageEmbed() 
        .setColor(EmbedUtil._botColor)
        .setThumbnail(ImageUtil.getRandom())
        .setFooter({"text" : "The Chameleon Bot"})
        .setTimestamp()
        .setDescription("Now playing 『" + newSong + "』!")
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        return message;
    }

    public static channelEmpty() : MessageEmbed {
        const message = new MessageEmbed() 
        .setColor(EmbedUtil._botColor)
        .setThumbnail(ImageUtil.getRandom())
        .setFooter({"text" : "The Chameleon Bot"})
        .setTimestamp()
        .setDescription("Channel empty !")
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        return message;
    }

    public static queueEnd() : MessageEmbed {
        const message = new MessageEmbed() 
        .setColor(EmbedUtil._botColor)
        .setThumbnail(ImageUtil.getRandom())
        .setFooter({"text" : "The Chameleon Bot"})
        .setTimestamp()
        .setDescription("No more song to play !")
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        return message;
    }
    
    public static queuePage(desc : string,page : number) : MessageEmbed {
        const message = new MessageEmbed()
        .setColor(EmbedUtil._botColor)
        .setTitle("__Queue__ - Page : " + page)
        .setFooter({"text" : "The Chameleon Bot"})
        .setTimestamp()
        .setDescription(desc)
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        return message;
    }

    public static credit() : MessageEmbed {
        const message = new MessageEmbed()
        .setColor(EmbedUtil._botColor)
        .setTitle(":star: __Credit__ :star:")
        .setDescription("**Dev.** : *Falcoch* ")
        .setTimestamp()
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        .setFooter({"text" : "The Chameleon Bot"})
        .setFields( {name : "**Version**", value : "*2.2*"},
                    {name : "**Description**", value : "*A simple Chameleon that play music* " + ChameleonEmoji.NICE})
        .setImage(PaintImage.BASIC);

        return message;
    }
    
    public static channelMessage(song : Song) : MessageEmbed {
        const message = new MessageEmbed()
        .setColor(EmbedUtil._botColor)
        .setTitle(":star: __The Chameleon Bot__ :star:");

        if(song == null) {
            message.setDescription("**__Playing :__** : *...*\n **__Duration__** : *...*.")
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setImage(PaintImage.CHANNEL);
        } 
        else {
            message.setDescription("**__Playing :__** : *" + song.name + "*\n **__Duration__**  : *" + song.duration + "*.")
            .setURL(song.url)
            .setImage(song.thumbnail);
        }

        return message;
    }

    public static infoSong(song : Song) : MessageEmbed {
        const message = new MessageEmbed()
        .setColor(EmbedUtil._botColor)
        .setTitle(":star: __Info__ :star:")
        .setDescription("Current song : \"" + song.name + "\".")
        .setTimestamp()
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        .setFooter({"text" : "The Chameleon Bot"})
        .setImage(song.thumbnail)
        .setFields( {name : "Author",value : song.author},
                    {name : "Duration",value : song.duration});

        return message;
    }
}