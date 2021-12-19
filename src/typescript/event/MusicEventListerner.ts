import { BasicEventListerner } from "./BasicEventListener";
import { WSDiscordMusicEvent } from "../discord/WSDiscordMusicEvent";
import { Client } from "discord.js";

export abstract class MusicEventListener extends BasicEventListerner {

    public constructor(client : Client) {
        super(client);
    }

    protected _initEvent() : void {
        super._initEvent();

        this._discordBot.on(WSDiscordMusicEvent.SONG_ADD, (queue, song) => {
            this._songAdd(queue,song);
        });

        this._discordBot.on(WSDiscordMusicEvent.SONG_CHANGED, (queue, newSong, oldSong) => {
            this._songChanged(queue,newSong,oldSong);
        });

        this._discordBot.on(WSDiscordMusicEvent.PLAYLIST_ADD, (queue, playlist) => {
            this._playlistAdd(queue,playlist);
        });

        this._discordBot.on(WSDiscordMusicEvent.QUEUE_END, (queue) => {
            this._queueEnd(queue);
        });

        this._discordBot.on(WSDiscordMusicEvent.QUEUE_DESTROYED, (queue) => {
            this._queueDestroyed(queue);
        });

        this._discordBot.on(WSDiscordMusicEvent.CHANNEL_EMPTY, (queue) => {
            this._channelEmpty(queue);
        });
    }

    protected abstract _songAdd(queue, song) : void; 
    protected abstract _songChanged(queue, newSong, oldSong) : void;
    protected abstract _playlistAdd(queue, playlist) : void;
    protected abstract _queueEnd(queue) : void;
    protected abstract _queueDestroyed(queue) : void;
    protected abstract _channelEmpty(queue) : void;
}