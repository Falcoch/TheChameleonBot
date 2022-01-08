import { BasicEventListerner } from "./BasicEventListener";
import { WSDiscordMusicEvent } from "../discord/WSDiscordMusicEvent";

export abstract class MusicEventListener extends BasicEventListerner {

    public constructor(commandeManager,commandeIdentifier : string = '%') {
        super(commandeManager,commandeIdentifier);
    }

    protected _initEvent() : void {
        
        super._initEvent();
        this.on(WSDiscordMusicEvent.SONG_ADD, (queue, song) => {
            this._songAdd(queue,song);
        });

        this.on(WSDiscordMusicEvent.SONG_CHANGED, (queue, newSong, oldSong) => {
            this._songChanged(queue,newSong,oldSong);
        });

        this.on(WSDiscordMusicEvent.PLAYLIST_ADD, (queue, playlist) => {
            this._playlistAdd(queue,playlist);
        });

        this.on(WSDiscordMusicEvent.QUEUE_END, (queue) => {
            this._queueEnd(queue);
        });

        this.on(WSDiscordMusicEvent.QUEUE_DESTROYED, (queue) => {
            this._queueDestroyed(queue);
        });

        this.on(WSDiscordMusicEvent.CHANNEL_EMPTY, (queue) => {
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