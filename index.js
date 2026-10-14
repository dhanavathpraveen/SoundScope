import { Player } from "./backend/player.js";
import { Playlist } from "./backend/playlist.js";
import { songs } from "./backend/song.js";

const playlist = new Playlist(1, "Justin Bieber", songs[0].cover);
for (const song of songs) {
    playlist.addSong(song);
}

const audio = new Audio();
const player = new Player(audio);
const songList = document.getElementById("songList");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const songCover = document.getElementById("songCover");
const playbackStatus = document.getElementById("playbackStatus");
const playPauseButton = document.getElementById("playPauseButton");
const playPauseIcon = playPauseButton.querySelector("i");
const seekBar = document.getElementById("seekBar");
const currentTimeLabel = document.querySelector(".curr-time");
const totalTimeLabel = document.getElementById("totalTime");
const volumeBar = document.getElementById("volumeBar");
let currentSongIndex = 0;

function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function updateProgress() {
    const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
    seekBar.max = String(duration);
    seekBar.value = String(audio.currentTime);
    seekBar.style.setProperty("--progress", `${duration ? (audio.currentTime / duration) * 100 : 0}%`);
    currentTimeLabel.textContent = formatTime(audio.currentTime);
}

function updatePlaybackState(isPlaying) {
    playPauseIcon.classList.toggle("fa-play", !isPlaying);
    playPauseIcon.classList.toggle("fa-pause", isPlaying);
    playPauseButton.setAttribute("aria-label", isPlaying ? "Pause song" : "Play song");
    playbackStatus.textContent = isPlaying ? "Playing" : "Paused";
}

function showCurrentSong(song) {
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    songCover.src = song.cover;
    songCover.alt = `${song.album} album cover`;
    for (const songButton of songList.querySelectorAll(".song-option")) {
        songButton.setAttribute("aria-current", String(Number(songButton.dataset.songId) === song.id));
    }
}

async function playSong(index) {
    const song = playlist.songs[index];
    if (!song) {
        return;
    }

    currentSongIndex = index;
    showCurrentSong(song);
    updatePlaybackState(false);
    playbackStatus.textContent = "Loading";
    seekBar.max = "0";
    seekBar.value = "0";
    seekBar.style.setProperty("--progress", "0%");
    currentTimeLabel.textContent = "00:00";
    totalTimeLabel.textContent = "00:00";

    try {
        await player.play(song);
    } catch (error) {
        updatePlaybackState(false);
        playbackStatus.textContent = "Could not play this preview";
        console.error(`Playback failed for "${song.title}":`, error);
    }
}

function renderSongs() {
    for (const [index, song] of playlist.songs.entries()) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "song-option";
        button.dataset.songId = String(song.id);
        button.setAttribute("aria-current", String(index === currentSongIndex));

        const cover = document.createElement("img");
        cover.src = song.cover;
        cover.alt = "";

        const description = document.createElement("span");
        const title = document.createElement("strong");
        title.textContent = song.title;
        const details = document.createElement("small");
        details.textContent = `${song.artist} · ${song.album}`;
        description.append(title, details);
        button.append(cover, description);
        button.addEventListener("click", () => playSong(index));
        songList.append(button);
    }
}

renderSongs();
showCurrentSong(playlist.songs[currentSongIndex]);
audio.volume = Number(volumeBar.value) / 100;

playPauseButton.addEventListener("click", async () => {
    if (audio.paused) {
        await playSong(currentSongIndex);
    } else {
        player.pause();
    }
});

document.getElementById("previousButton").addEventListener("click", () => {
    const previousIndex = (currentSongIndex - 1 + playlist.songs.length) % playlist.songs.length;
    playSong(previousIndex);
});

document.getElementById("nextButton").addEventListener("click", () => {
    const nextIndex = (currentSongIndex + 1) % playlist.songs.length;
    playSong(nextIndex);
});

seekBar.addEventListener("input", () => {
    currentTimeLabel.textContent = formatTime(Number(seekBar.value));
    const duration = Number(seekBar.max);
    seekBar.style.setProperty("--progress", `${duration ? (Number(seekBar.value) / duration) * 100 : 0}%`);
});

seekBar.addEventListener("change", () => {
    audio.currentTime = Number(seekBar.value);
});

volumeBar.addEventListener("input", () => {
    audio.volume = Number(volumeBar.value) / 100;
});

audio.addEventListener("loadedmetadata", () => {
    totalTimeLabel.textContent = formatTime(audio.duration);
    updateProgress();
});
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("play", () => updatePlaybackState(true));
audio.addEventListener("pause", () => updatePlaybackState(false));
audio.addEventListener("ended", () => {
    if (currentSongIndex < playlist.songs.length - 1) {
        playSong(currentSongIndex + 1);
    } else {
        updatePlaybackState(false);
        playbackStatus.textContent = "Finished";
    }
});
audio.addEventListener("error", () => {
    if (player.currentSong) {
        playbackStatus.textContent = "Could not load this preview";
        console.error(`Audio failed to load: ${player.currentSong.audioURL}`);
    }
});