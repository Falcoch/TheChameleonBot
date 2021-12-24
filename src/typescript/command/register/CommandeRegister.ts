import { Client, Message, SystemChannelFlags } from "discord.js";
import { BasicCommande } from "../BasicCommande";

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
            if(this._registry[i].activated) {
                for(let j = 0; j < this._registry[i].commandeName.length; j++) {
                    if(this._registry[i].commandeName[j] == commande.content.split(" ")[0].toLocaleLowerCase())
                    {   
                       
                        if(!this._registry[i].adminOnly || (this._registry[i].adminOnly && commande.member.permissions.has("ADMINISTRATOR")))
                        {
                            this._registry[i].execute(client,commande);
                            return true;
                        }
                    }
                }
            }
        }
        return false;    
    }
}