import { Client, Message, SystemChannelFlags } from "discord.js";
import { BasicCommande } from "./BasicCommande";

export abstract class CommandeManager {

    protected static _registry : BasicCommande[] = [];

    public static addCommande(commande : BasicCommande ) : void {
        this._registry.push(commande);
    }

    public static deleteCommande(commande : BasicCommande ) : void {
        for(let i = 0; i < this._registry.length; i++ )
            if(typeof(this._registry[i]) === typeof(commande))
                delete this._registry[i];
    }

    public static callCommande(client : Client,commande : Message) : boolean {
        for(let i = 0; i < this._registry.length; i++ ) {
            if(this._registry[i].isActivated()) {
                for(let j = 0; j < this._registry[i].getCommandeAlias().length; j++) {
                   
                    if(this._registry[i].getCommandeAlias()[j] == commande.content)
                    {   
                        if(!this._registry[i].isAdminOnly() || (this._registry[i].isAdminOnly() && commande.member.permissions.has("ADMINISTRATOR")))
                        {
                            this._registry[i].execute(client,commande);
                            return true
                        }
                    }
                }
            }
        }
        return false;    
    }
}