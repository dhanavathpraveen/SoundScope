export class Player {
    constructor(audio = new Audio()) {
        this.audio = audio;
        this.currentSong = null;
    }

    async play(song = this.currentSong) {
        if (!song?.audioURL) {
            throw new Error("Cannot play a song without an audio URL.");
        }

        if (this.currentSong?.id !== song.id) {
            this.currentSong = song;
            this.audio.src = song.audioURL;
            this.audio.load();
        }

        if (this.audio.ended) {
            this.audio.currentTime = 0;
        }

        await this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    stop() {
        this.audio.pause();
        if (this.currentSong) {
            this.audio.currentTime = 0;
        }
        this.currentSong = null;
    }
}