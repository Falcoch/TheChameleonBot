export enum WSDiscordEvent {
    READY = "ready",
    QUIT = "resume",
    RECONNECT = "reconnecting",
    DISCONNECT = "disconnect",

    GUILD_DELETE_QUIT = "guildDelete",

    MESSAGE_REACTION_ADD = "interactionCreate",
    MESSAGE_REACTION_REMOVE = "messageractionremove",

    CHANNEL_CREATE = "channelCreate",
    CHANNEL_DELETE = "channelDelete",
    CHANNEL_UPDATE = "channelupdate",
    MESSAGE_CREATE = "messageCreate",
    MESSAGE_DELETE = "messagedelete",
    MESSAGE_UPDATE = "messageupdate",

    ERROR = "error",
    WARN = "warn"
}
