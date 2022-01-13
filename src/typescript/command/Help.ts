import { Client, GuildEmoji, Message, MessageEmbed } from "discord.js";
import { WSBotErrorEvent } from "../bot/WSBotErrorEvent";
import { CommandeUtils } from "../util/CommandeUtil";
import { EmbedUtil } from "../util/EmbedUtil";
import { BasicCommande } from "./BasicCommande";
import { CommandeRegister } from "./register/CommandeRegister";

export class Help implements BasicCommande {

    commandeName : string[];
    activated : boolean;
    adminOnly : boolean;
    secret : boolean;
    description: string;

    public commandeRegister : CommandeRegister = null;

    public constructor(register : CommandeRegister,active : boolean,admOnely : boolean) {
        this.activated = active;
        this.adminOnly = admOnely;
        this.commandeName = ['help'];
        this.commandeRegister = register;
        this.secret = false;
        this.description = "Allow you to see help about a command.";
    }

    public async execute(client: Client<boolean>, commande: Message, silent : boolean): Promise<void> {
        try {

            const args : string[] = CommandeUtils.getArgument(commande.content);

            if(args[1] == null) {
                commande.channel.send({embeds: [EmbedUtil.helpList(this.commandeRegister.getAllCommande())]});
            }
            else {
                if(this.commandeRegister.isCommande(args[1])) {
                    if(this.commandeRegister.getCommandeByName(args[1])[0].activated && !this.commandeRegister.getCommandeByName(args[1])[0].secret) {
                        commande.channel.send({ embeds: [this.commandeRegister.getCommandeByName(args[1])[0].help()]});
                    }
                }
            }

        } catch(err) {
            client.emit(WSBotErrorEvent.UNKNOWN_ERROR,this.commandeName[0],err);
            return null;
        }
    }

    public help(): MessageEmbed {
        let args = 
        [
            "Name of Commande"
        ];

        let argsDesc = 
        [
            "The commande that you need help."
        ];

        return EmbedUtil.helpMessage("Help",args,argsDesc,this.description);
    }
}