import { Client, Message } from "discord.js";
import { BasicCommande } from "../BasicCommande";

export abstract class CommandeManager {

    private static _registry : BasicCommande[] = [];

    public static addCommande(commande : BasicCommande ) : boolean {
        let noDuplicate = true;
        CommandeManager._registry.forEach(cmd => {
            cmd == commande ? noDuplicate = false : "";
        });

        noDuplicate ? this._registry.push(commande) : "" ;
        return noDuplicate;
    }

    public static deleteCommandeByName(commande : BasicCommande ) : boolean {
        for(let i = 0; i < this._registry.length; i++ )
            if(typeof(this._registry[i]) === typeof(commande)) {
                delete this._registry[i];
                return true;
            }
        return false;
    }

    public static getCommandeByName(commandeName : string) : BasicCommande[] {
        commandeName = commandeName.toLowerCase();
        let result : BasicCommande[] = [];
        CommandeManager._registry.forEach(cmd => {
            cmd.commandeName.forEach(name => {
                name.toLowerCase() == commandeName ? result.push(cmd) : "";
            });
            
        });
        return result;
    }

    public static getRegistrySize() {
        return CommandeManager._registry.length;
    }

    public static callCommande(client : Client,commande : Message) : boolean {
        for(let i = 0; i < this._registry.length; i++ ) {
            if(this._registry[i].activated) {
                for(let j = 0; j < this._registry[i].commandeName.length; j++) {
                    if(this._registry[i].commandeName[j].toLowerCase() == commande.content.split(" ")[0].toLocaleLowerCase())
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