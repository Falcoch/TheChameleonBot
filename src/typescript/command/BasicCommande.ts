import { Client, Message, TextBasedChannels } from "discord.js";

export interface BasicCommande {
    
    commandeName : string[];

    activated : boolean;
    adminOnly : boolean;
    secret : boolean;

    execute(client : Client ,commande : Message) : void;
    help(channel : TextBasedChannels) : void;
}

