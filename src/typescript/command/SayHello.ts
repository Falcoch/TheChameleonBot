import { Client, Message, TextBasedChannels } from "discord.js";
import { BasicCommande } from "./BasicCommande";

export class SayHello implements BasicCommande {
    
    commandeName: string[];

    activated: boolean;
    adminOnly: boolean;
    secret: boolean;

    public constructor() {
        this.commandeName ["sayhello"];
        this.activated =  true;
        this.adminOnly =  false;
        this.secret = false;
    }

    public execute(client: Client<boolean>, commande: Message): void {
        commande.channel.send("Hello !");
    }

    public help(channel: TextBasedChannels): void {
        
    }
}