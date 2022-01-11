import { CommandeRegister } from "../command/register/CommandeRegister";
import { BasicChannelListener } from "../event/BasicChannelListener";

export class ChammeleonChannelListener extends BasicChannelListener  {
    
    public constructor(commandeManager : CommandeRegister) {
        super(commandeManager);
    }
}