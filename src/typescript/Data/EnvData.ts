import DotEnv from "dotenv"

export abstract class EnvData {

    private static _configuredEnv : boolean = false;

    private static _privateToken : string;
    private static _identifierToken : string;

    public static configEnv() {
        if(!this._configuredEnv) {
            DotEnv.config();
            EnvData._privateToken = process.env.BOT_PRIVATE_TOKEN;
            EnvData._identifierToken = process.env.COMMANDE_IDENTIFIER;
    
            EnvData._configuredEnv= true;
        }
    }

    public static reloadEnv() {
        DotEnv.config();
        EnvData._privateToken = process.env.BOT_PRIVATE_TOKEN;
        EnvData._identifierToken = process.env.COMMANDE_IDENTIFIER;
    
        EnvData._configuredEnv= true;
    }

    public static isConfigured() : boolean {
        return EnvData._configuredEnv;
    }

    public static getPrivateToken() : string {
        return EnvData._privateToken;
    }

    public static getIdentifierToken() : string {
        return EnvData._identifierToken;
    }
}