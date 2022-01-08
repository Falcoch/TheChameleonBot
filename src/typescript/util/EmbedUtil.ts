import { Playlist, Song } from "discord-music-player";
import { MessageEmbed,ColorResolvable } from "discord.js";

export class EmbedUtil {
    public static _botColor : ColorResolvable = '#3A051D'
    
    public static normalMessage(title : string, descrition : string) : MessageEmbed {
        const message = new MessageEmbed()
            .setColor(EmbedUtil._botColor)
            .setTitle(title)
            .setDescription(descrition)
        return message;
    }

    public static imageMessage(title : string, descrition : string,imageUrl : string) : MessageEmbed {
        const message = new MessageEmbed()
            .setColor(EmbedUtil._botColor)
            .setTitle(title)
            .setDescription(descrition)
            .setImage(imageUrl);
        return message;
    }

    public static playingSongMessage(authorUsername : string, song : Song) : MessageEmbed {
        const message = new MessageEmbed()
            .setColor(EmbedUtil._botColor)
            .setTitle("Play")
            .setDescription("Currently Playing :『" + song.name + "』")
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
            .setDescription("Currently Playing the Playlist :『" + playlist.name + "』")
            .addFields(
                { name: 'Author', value: playlist.author }
            )
            .setFooter("Requested by " + authorUsername);
        return message;
    }

    public static errorMessage(description : string) : MessageEmbed {
        const message = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Error")
            .setDescription(description)
            .setThumbnail("../../../gitimage/icon.png");

        return message;
    }

    public static helpMessage(cmdName : string, args : string[],argsDesc : string[], cmdDesc : string) : MessageEmbed {

        let argsText = cmdName;
        args.forEach(a =>{ argsText += (" <" + args + ">"); });

        const message = new MessageEmbed() 
            .setColor(EmbedUtil._botColor)
            .setTitle("Help - " + cmdName)
            .setDescription(argsText)
            .setDescription(cmdDesc);

        if(args.length > argsDesc.length)
        {
            for(let i = 0; i < args.length - argsDesc.length; i++) {
                argsDesc[i + argsDesc.length] = null;
            }
        }


        for(let i = 0; i < args.length; i++) {
            argsDesc[i] == null ? args[i] = "..." : "";
            argsDesc[i] == "" ? args[i] = "..." : "";
            
            message.addFields({ name: args[i], value: argsDesc[i] });
        }

        message.setTimestamp();
        return message;
    }
}