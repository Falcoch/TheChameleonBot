import { BasicEventListerner } from "./BasicEventListener";
import { WSDiscordMusicEvent } from "../discord/WSDiscordMusicEvent";

export abstract class MusicEventListener extends BasicEventListerner {

    public constructor(commandeManager,commandeIdentifier : string = '%') {
        super(commandeManager,commandeIdentifier);
    }

    protected _initEvent() : void {
        
        super._initEvent();
        //@ts-ignore
        this.player.on(WSDiscordMusicEvent.SONG_ADD, (queue, song) => {
            this._songAdd(queue,song);
        });

        //@ts-ignore
        this.player.on(WSDiscordMusicEvent.SONG_CHANGED, (queue, newSong, oldSong) => {
            this._songChanged(queue,newSong,oldSong);
        });

        //@ts-ignore
        this.player.on(WSDiscordMusicEvent.PLAYLIST_ADD, (queue, playlist) => {
            this._playlistAdd(queue,playlist);
        });

        //@ts-ignore
        this.player.on(WSDiscordMusicEvent.QUEUE_END, (queue) => {
            this._queueEnd(queue);
        });

        //@ts-ignore
        this.player.on(WSDiscordMusicEvent.QUEUE_DESTROYED, (queue) => {
            this._queueDestroyed(queue);
        });

        //@ts-ignore
        this.player.on(WSDiscordMusicEvent.CHANNEL_EMPTY, (queue) => {
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