import { TheChameleonBotEventListener } from "./ChameleonEventListener";
import { Client, Intents} from "discord.js";
import { Player } from "discord-music-player";
import { TheChameleonBotCommandeManager } from "./ChameleonCommandeManager";


export class TheChameleonBot {
    
    private _eventListener : TheChameleonBotEventListener;
    private _discordBot : Client;
    private _privateBotToken : string;

    public constructor(privateBotToken : string,commandeIdentifier : string = '%') {
        const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]});
        const player = new Player(client,{leaveOnEmpty: false,});

        //@ts-ignore
        client.player = player;

        this._discordBot = client;
        this._privateBotToken = privateBotToken;
        TheChameleonBotCommandeManager.registerCommande();
        this._eventListener = new TheChameleonBotEventListener(this._discordBot,commandeIdentifier);
    }

    public listen() {
        this._discordBot.login(this._privateBotToken);
    }
}

