import { Play } from "../command/Play";
import { CommandeManager } from "../command/register/CommandeRegister";

export class TheChameleonBotCommandeManager extends CommandeManager {

    public static registerCommande() {
        TheChameleonBotCommandeManager.addCommande(new Play(true,false));
    }
}