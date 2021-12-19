import { Client, Message, SystemChannelFlags } from "discord.js";
import { BasicCommande } from "./BasicCommande";

export abstract class CommandeManager {

    protected static _registry : BasicCommande[] = [];

    public constructor() {

    }

    public static addCommande(commande : BasicCommande ) : void {
        this._registry.push(commande);
    }

    public static registerCommande() {

    }  

    public static callCommande(client : Client,commande : Message) : boolean {
        for(let i = 0; i < this._registry.length; i++ ) {
            if(this._registry[i].isActivated()) {
                for(let j = 0; j < this._registry[i].getCommandeAlias().length; j++) {
                   
                    if(this._registry[i].getCommandeAlias()[j] == commande.content)
                    { 
                        this._registry[i].execute(client,commande);
                        return true
                    }
                }
            }
        }
        return false;    
    }

}