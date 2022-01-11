export enum WSDiscordEvent {
    READY = "ready",
    QUIT = "resume",
    RECONNECT = "reconnecting",
    MESSAGE_REACTION_ADD = "interactionCreate",
    MESSAGE_REACTION_REMOVE = "messageractionremove",
    CHANNEL_CREATE = "channelcreate",
    CHANNEL_DELETE = "channeledelete",
    CHANNEL_UPDATE = "channelupdate",
    MESSAGE_CREATE = "messageCreate",
    MESSAGE_DELETE = "messagedelete",
    MESSAGE_UPDATE = "messageupdate",
    ERROR = "error",
    WARN = "warn"
}
