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
        this.commandeName = ['dev','developement','d'];
        this.secret = false;
        this.description = "Used to use commande as a developper, only advanced pepople should use this !";
    }

    public async execute(client: Client<boolean>, commande: Message, silent : boolean): Promise<void> {
        
    }

    public help(): MessageEmbed {
       return null;
    }
}