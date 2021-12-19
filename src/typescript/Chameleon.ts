import { TheChameleonBot } from "./bot/TheChameleonBot";
import { EnvData } from "./data/EnvData";

EnvData.configEnv();
var Chameleon : TheChameleonBot = new TheChameleonBot(EnvData.getPrivateToken());
Chameleon.listen();