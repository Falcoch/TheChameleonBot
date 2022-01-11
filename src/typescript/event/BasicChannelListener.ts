import { TextChannel } from "discord.js";
import { CommandeRegister } from "../command/register/CommandeRegister";

export abstract class BasicChannelListener {
    
    _active : boolean = false;
    _commandeManager : CommandeRegister = null;
    _channel : TextChannel = null

    public constructor(commandeManager : CommandeRegister) {
        this._active = false;
        this._commandeManager = commandeManager;
        this._channel = null;
    }

    public link(channel : TextChannel) : void {
        this._active = true;
        this._channel = channel;
    }

    public unLink(channel : TextChannel) : void {
        this._active = false;
        this._channel = null;
    }

    public setup(channel : TextChannel) : void {

    }
}