import { Client, Message, MessageEmbed } from "discord.js";
import { WSBotErrorEvent } from "../bot/WSBotErrorEvent";
import { EmbedUtil } from "../util/EmbedUtil";
import { BasicCommande } from "./BasicCommande";

export class Credit implements BasicCommande {

    commandeName : string[];
    activated : boolean;
    adminOnly : boolean;
    secret : boolean;
    description: string;

    public constructor(active : boolean, admOnly : boolean) {
        this.activated = active
        this.adminOnly = admOnly
        this.secret = false;
        this.commandeName = ['credit','author'];
        this.description = "Display the bot credits";
    }

    public async execute(client: Client<boolean>, commande: Message, silent : boolean) : Promise<void> {
        try {
            commande.channel.send({embeds : [EmbedUtil.credit()]});

        } catch(err) {
            client.emit(WSBotErrorEvent.UNKNOWN_ERROR,this.commandeName[0],err);
            return null;
        }
    }

    public help() : MessageEmbed {
        return EmbedUtil.helpMessage("Credit",null,null,this.description);
    }
}