class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.playlists=[];
        this.likedSongs=[];
    }
    createPlaylist(playlist){
        this.playlists.push(playlist);
    };
    likeSongs(likesong){
        this.likedSongs.push(likesong);
    }
}
