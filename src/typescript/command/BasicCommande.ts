import { Client, Message, MessageEmbed } from "discord.js";

export interface BasicCommande {
    
    commandeName : string[];

    activated : boolean;
    adminOnly : boolean;
    secret : boolean;

    description : string;

    execute(client : Client ,commande : Message, silent : boolean) : Promise<void>;
    help() : MessageEmbed;
}

