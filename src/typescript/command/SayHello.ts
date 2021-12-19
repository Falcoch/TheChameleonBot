import { Client, Message, TextBasedChannels } from "discord.js";
import { BasicCommande } from "./BasicCommande";

export class SayHello extends BasicCommande {
    
    public constructor() {
        super(["sayhello"],true,false,false);
    }

    public execute(client: Client<boolean>, commande: Message): void {
        commande.channel.send("Hello !");
    }

    public help(channel: TextBasedChannels): void {
        
    }
}