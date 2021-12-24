import { TheChameleonBot } from "./bot/TheChameleonBot";
import DotEnv from 'dotenv'

DotEnv.config()
var Chameleon : TheChameleonBot = new TheChameleonBot(process.env.BOT_PRIVATE_TOKEN,'%');
Chameleon.listen();