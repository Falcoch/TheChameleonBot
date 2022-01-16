import { Clear } from "../command/Clear";
import { Credit } from "../command/Credit";
import { Help } from "../command/Help";
import { Shuffle } from "../command/Shuffle";
import { Pause } from "../command/Pause";
import { Play } from "../command/Play";
import { List } from "../command/Queue";
import { CommandeRegister } from "../command/register/CommandeRegister";
import { Resume } from "../command/Resume";
import { Skip } from "../command/Skip";
import { Stop } from "../command/Stop";
import { LoopSong } from "../command/LoopSong";
import { LoopQueue } from "../command/LoopQueue";
import { ConsoleUtils } from "../util/ConsoleUtils";
import { Info } from "../command/Info";

export class TheChameleonBotCommandeManager extends CommandeRegister {

    public constructor() {
        super();
        ConsoleUtils.logSuccess("Loding commandes.");
    }

    protected _registerCommande() {
        this.addCommande(new Play(true,false));
        this.addCommande(new Help(this,true,false));
        this.addCommande(new Stop(true,false));
        this.addCommande(new Skip(true,false));
        this.addCommande(new Pause(true,false));
        this.addCommande(new Resume(true,false));
        this.addCommande(new Clear(true,false));
        this.addCommande(new List(10,true,false));
        this.addCommande(new Credit(true,false));
        this.addCommande(new Shuffle(true,false));
        this.addCommande(new LoopSong(true,false));
        this.addCommande(new LoopQueue(true,false));
        this.addCommande(new Info(true,false));
    }
}