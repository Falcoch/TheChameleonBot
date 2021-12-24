import { Play } from "../command/Play";
import { CommandeManager } from "../command/register/CommandeRegister";
import { SayHello } from "../command/SayHello";

export class TheChameleonBotCommandeManager extends CommandeManager {

    public constructor() {
        super()
    }

    public static registerCommande() {
        TheChameleonBotCommandeManager.addCommande(new SayHello());
        TheChameleonBotCommandeManager.addCommande(new Play(true,false));
    }
}