import { Client, Message } from "discord.js";
import { BasicEventListerner } from "../../event/BasicEventListener";
import { BasicCommande } from "../BasicCommande";

export abstract class CommandeRegister {

    private _registry : BasicCommande[] = [];

    public constructor() {
        this._registry = [];
        this._registerCommande();
    }
    

    public addCommande(commande : BasicCommande ) : boolean {
        let noDuplicate = true;
        this._registry.forEach(cmd => {
            cmd == commande ? noDuplicate = false : "";
        });

        noDuplicate ? this._registry.push(commande) : "" ;
        return noDuplicate;
    }

    public deleteCommandeByName(commande : BasicCommande ) : boolean {
        for(let i = 0; i < this._registry.length; i++ )
            if(typeof(this._registry[i]) === typeof(commande)) {
                delete this._registry[i];
                return true;
            }
        return false;
    }

    public getCommandeByName(commandeName : string) : BasicCommande[] {
        commandeName = commandeName.toLowerCase();
        let result : BasicCommande[] = [];
        this._registry.forEach(cmd => {
            cmd.commandeName.forEach(name => {
                name.toLowerCase() == commandeName ? result.push(cmd) : ""; 
            });
            
        });
        return result;
    }

    public getRegistrySize() : number {
        return this._registry.length;
    }

    public isCommande(commandeName : string) : boolean {
        if(this.getCommandeByName(commandeName).length >= 1 )
            return true;
        else
            return false;
    }

    public getAllCommande() : BasicCommande[] {
        return this._registry;
    }

    public callCommande(client : Client,commande : Message) : boolean {
        for(let i = 0; i < this._registry.length; i++ ) {
            if(this._registry[i].activated) {
                for(let j = 0; j < this._registry[i].commandeName.length; j++) {
                    if(this._registry[i].commandeName[j].toLowerCase() == commande.content.split(" ")[0].toLocaleLowerCase()) {   
                        if(!this._registry[i].adminOnly || (this._registry[i].adminOnly && commande.member.permissions.has("ADMINISTRATOR"))) {
                            this._registry[i].execute(client,commande);
                            return true;
                        }
                    }
                }
            }
        }
        return false;    
    }

    protected abstract _registerCommande();
}