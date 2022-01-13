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
            .setTitle(title)
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setDescription(descrition);
        return message;
    }

    public static imageMessage(title : string, descrition : string,imageUrl : string) : MessageEmbed {
        const message = new MessageEmbed()
            .setColor(EmbedUtil._botColor)
            .setTitle(title)
            .setDescription(descrition)
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setImage(imageUrl);
        return message;
    }

    public static playingSongMessage(authorUsername : string, song : Song) : MessageEmbed {
        const message = new MessageEmbed()
            .setColor(EmbedUtil._botColor)
            .setTitle("Play")
            .setThumbnail(ImageUtil.getRandom())
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setDescription("Currently Playing :『" + song.name + "』")
            .addFields(
                { name: 'Author', value: song.author },
                { name: 'Duration', value: song.duration, inline: true },
            )
            .setFooter("Requested by " + authorUsername);
        return message;
    }

    public static addSongToQueueMessage(authorUsername : string, song : Song) : MessageEmbed {
        const message = new MessageEmbed()
            .setColor(EmbedUtil._botColor)
            .setTitle("Play")
            .setThumbnail(ImageUtil.getRandom())
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setDescription("Add『" + song.name + "』to queue !")
            .addFields(
                { name: 'Author', value: song.author },
                { name: 'Duration', value: song.duration, inline: true },
            )
            .setFooter("Requested by " + authorUsername);
        return message;
    }

    public static playingPlaylistMessage(authorUsername : string, playlist : Playlist) : MessageEmbed {
        const message = new MessageEmbed()
            .setColor(EmbedUtil._botColor)
            .setTitle("Playlist")
            .setThumbnail(ImageUtil.getRandom())
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setDescription("Currently Playing the Playlist :『" + playlist.name + "』!")
            .addFields(
                { name: 'Size', value: (playlist.songs.length + " songs.")},
                { name: 'Author', value: playlist.author },
            )
            .setFooter("Requested by " + authorUsername);
        return message;
    }

    public static addPlaylistToQueueMessage(authorUsername : string, playlist : Playlist) : MessageEmbed {
        const message = new MessageEmbed()
            .setColor(EmbedUtil._botColor)
            .setTitle("Playlist")
            .setThumbnail(ImageUtil.getRandom())
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setDescription("Currently Playing the Playlist :『" + playlist.name + "』!")
            .addFields(
                { name: 'Size', value: (playlist.songs.length + " songs.")},
                { name: 'Author', value: playlist.author },
            )
            .setFooter("Requested by " + authorUsername);
        return message;
    }

    public static errorMessage(description : string) : MessageEmbed {
        const message = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Error")
            .setThumbnail(ImageUtil.getError())
            .setDescription(description)
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setThumbnail("../../../gitimage/icon.png");

        return message;
    }

    public static helpMessage(cmdName : string, args : string[],argsDesc : string[], cmdDesc : string) : MessageEmbed {

        let argsText = cmdName;
    
        args != null ? args.forEach(a =>{ argsText += (" <" + args + ">"); }) : "";

        const message = new MessageEmbed() 
            .setColor(EmbedUtil._botColor)
            .setTitle(cmdName)
            .setThumbnail(ImageUtil.getHelp())
            .setFooter("The Chameleon Bot")
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setDescription(cmdDesc)
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
        .setTitle("Commande List")
        .setThumbnail(ImageUtil.getHelp())
        .setFooter("The Chameleon Bot")
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
        .setTitle("Playing Music")
        .setThumbnail(ImageUtil.getRandom())
        .setFooter("The Chameleon Bot")
        .setTimestamp()
        .setDescription("Now playing 『" + newSong + "』!")
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        return message;
    }

    public static channelEmpty() : MessageEmbed {
        const message = new MessageEmbed() 
        .setColor(EmbedUtil._botColor)
        .setTitle("Playing Music")
        .setThumbnail(ImageUtil.getRandom())
        .setFooter("The Chameleon Bot")
        .setTimestamp()
        .setDescription("Channel empty !")
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        return message;
    }

    public static queueEnd() : MessageEmbed {
        const message = new MessageEmbed() 
        .setColor(EmbedUtil._botColor)
        .setTitle("Playing Music")
        .setThumbnail(ImageUtil.getRandom())
        .setFooter("The Chameleon Bot")
        .setTimestamp()
        .setDescription("No more song to play !")
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        return message;
    }
    
    public static queuePage(desc : string,page : number) : MessageEmbed {
        const message = new MessageEmbed()
        .setColor(EmbedUtil._botColor)
        .setTitle("Queue - Page : " + page)
        .setFooter("The Chameleon Bot")
        .setTimestamp()
        .setDescription(desc)
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        return message;
    }

    public static credit() : MessageEmbed {
        const message = new MessageEmbed()
        .setColor(EmbedUtil._botColor)
        .setTitle("__Crédit__")
        .setDescription("**Dev.** : *Falcoch* ")
        .setTimestamp()
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        .setFooter("The Chameleon Bot")
        .setFields( {name : "**Version**", value : "*2.2*"},
                    {name : "**Description**", value : "*A simple Chameleon that play music* " + ChameleonEmoji.NICE})
        .setImage(PaintImage.BASIC);

        return message;
    }
    
    public static channelMessage(song : Song) : MessageEmbed {
        const message = new MessageEmbed()
        .setColor(EmbedUtil._botColor)
        .setTitle("__The Chameleon Bot__");

        if(song == null) {
            message.setDescription("__Playing :__ *" + "..." + "*\n *duration* : " + "..." + ".")
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setImage(PaintImage.MUSIC);
        } 
        else {
            message.setDescription("__Playing :__ *" + song.name + "*\n *duration* : " + song.duration + ".")
            .setURL(song.url)
            .setImage(song.thumbnail);
        }

        message.setTimestamp()
        .setFooter("The Chameleon Bot");

        return message;
    }
}