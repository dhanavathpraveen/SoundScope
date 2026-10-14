# Spotify-clone

## Music player

Songs are listed in `backend/song.js`, while `backend/playlist.js` and
`backend/player.js` provide playlist and playback behavior used by `index.js`.
The listed Justin Bieber tracks use official 30-second previews; the player
shows the preview's actual duration and supports seeking and volume control.

Because the page uses JavaScript modules, serve the project from its root
directory instead of opening `index.html` directly:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.