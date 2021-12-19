export enum WSDiscordEvent {
    READY = "ready",
    QUIT = "resumed",
    RECONNECT = "reconnect",
    MESSAGE_REACTION_ADD = "messagereactionadd",
    MESSAGE_REACTION_REMOVE = "messageractionremove",
    CHANNEL_CREATE = "channelcreate",
    CHANNEL_DELETE = "channeledelete",
    CHANNEL_UPDATE = "channelupdate",
    MESSAGE_CREATE = "messageCreate",
    MESSAGE_DELETE = "messagedelete",
    MESSAGE_UPDATE = "messageupdate",
    ERROR = "error"
}
