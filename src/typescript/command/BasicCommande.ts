import { Client, Message, TextBasedChannels } from "discord.js";

export abstract class BasicCommande
{
    protected _commandeName : string[];

    protected _activated : boolean;
    protected _secret : boolean;
    protected _admin : boolean;

    public constructor(commandeNames : string[], activeted : boolean, secret : boolean,admin : boolean) {
        this._commandeName = commandeNames;
        this._activated = activeted;
        this._secret = secret;
        this._admin = admin;
    }

    public getCommandeAlias() : string[] {
        return this._commandeName
    }

    public isActivated() : boolean {
        return this._activated;
    }

    public isSecret() : boolean {
        return this._secret;
    }

    public isAdminOnly() : boolean {
        return this._admin;
    }

    public setAdminOnly(newState : boolean ) {
        this._admin = newState;
    }

    public abstract execute(client : Client ,commande : Message) : void;
    public abstract help(channel : TextBasedChannels) : void;
}