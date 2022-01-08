import { Help } from "../command/Help";
import { Play } from "../command/Play";
import { CommandeRegister } from "../command/register/CommandeRegister";
import { TheChameleonBotEventListener } from "./ChameleonEventListener";

export class TheChameleonBotCommandeManager extends CommandeRegister {

    public constructor() {
        super();
    }

    protected _registerCommande() {
        this.addCommande(new Play(true,false));
        this.addCommande(new Help(true,false));
    }
}