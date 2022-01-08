import { Client, Message, MessageEmbed } from "discord.js";
import { WSBotErrorEvent } from "../bot/WSBotErrorEvent";
import { CommandeUtils } from "../util/CommandeUtil";
import { BasicCommande } from "./BasicCommande";
import { CommandeRegister } from "./register/CommandeRegister";

export class Help implements BasicCommande {

    commandeName : string[];
    activated : boolean;
    adminOnly : boolean;
    secret : boolean;

    public commandeRegister = null;

    public constructor(active : boolean,admOnely : boolean) {
        this.activated = active;
        this.adminOnly = admOnely;
        this.commandeName = ['help'];
        this.secret = false;
    }

    public async execute(client: Client<boolean>, commande: Message): Promise<void> {
        try {

            const args : string[] = CommandeUtils.getArgument(commande.content);

            if(args[1] == null) {
                
            }
            else {
                
            }

        } catch(err) {
            client.emit(WSBotErrorEvent.UNKNOWN_ERROR);
            return null;
        }
    }

    public help(): MessageEmbed {
        return null;
    }
}