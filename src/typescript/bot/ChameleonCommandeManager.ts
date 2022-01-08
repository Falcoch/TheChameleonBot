import { Clear } from "../command/Clear";
import { Help } from "../command/Help";
import { Pause } from "../command/Pause";
import { Play } from "../command/Play";
import { CommandeRegister } from "../command/register/CommandeRegister";
import { Resume } from "../command/Resume";
import { Skip } from "../command/Skip";
import { Stop } from "../command/Stop";

export class TheChameleonBotCommandeManager extends CommandeRegister {

    public constructor() {
        super();
    }

    protected _registerCommande() {
        this.addCommande(new Play(true,false));
        this.addCommande(new Help(this,true,false));
        this.addCommande(new Stop(true,false));
        this.addCommande(new Skip(true,false));
        this.addCommande(new Pause(true,false));
        this.addCommande(new Resume(true,false));
        this.addCommande(new Clear(true,false));
    }
}