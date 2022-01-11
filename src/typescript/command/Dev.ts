import { Client, Message, MessageEmbed } from "discord.js";
import { BasicCommande } from "./BasicCommande";

export class Dev implements BasicCommande {

    commandeName : string[];
    activated : boolean;
    adminOnly : boolean;
    secret : boolean;
    description: string;

    public constructor(active : boolean,admOnely : boolean) {
        this.activated = active;
        this.adminOnly = admOnely;
        this.commandeName = ['help'];
        this.secret = false;
        this.description = "Allow you to see help about a command.";
    }

    public async execute(client: Client<boolean>, commande: Message): Promise<void> {
        
    }

    public help(): MessageEmbed {
       return null;
    }
}