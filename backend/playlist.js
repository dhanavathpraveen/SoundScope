export class Playlist {
    constructor(id, name, cover) {
        this.id = id;
        this.name = name;
        this.cover = cover;
        this.songs = [];
    }

    addSong(song) {
        this.songs.push(song);
    }
    removeSong(songId){
        this.songs = this.songs.filter(song => song.id !== songId);
    }
}