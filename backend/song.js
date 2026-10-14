export class Song {
    constructor(id, title, artist, album, duration, cover, audioURL) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.duration = duration;
        this.cover = cover;
        this.audioURL = audioURL;
    }
}

const believeCover =
    "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/73/08/1a/73081a96-0f7c-b5f8-2757-5c17fb714323/12UMGIM31899.rgb.jpg/300x300bb.jpg";
const purposeCover =
    "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/75/11/84/751184b0-77df-1eff-bb20-dac03247425d/15UMGIM59808.rgb.jpg/300x300bb.jpg";

export const songs = [
    new Song(
        1,
        "Baby (feat. Ludacris)",
        "Justin Bieber",
        "My World 2.0",
        214,
        "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/b9/0a/b4/b90ab45a-07b1-0bcc-331c-c496a21d07e4/10UMGIM01134.rgb.jpg/300x300bb.jpg",
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/89/66/d3/8966d3cb-68eb-5f2c-fef8-4ac420721387/mzaf_3044382270474258872.plus.aac.p.m4a"
    ),
    new Song(
        2,
        "Beauty and a Beat (feat. Nicki Minaj)",
        "Justin Bieber",
        "Believe",
        228,
        believeCover,
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ea/b4/da/eab4da01-c422-c640-1ac3-97d746c5871c/mzaf_12363686639555987211.plus.aac.p.m4a"
    ),
    new Song(
        3,
        "Love Yourself",
        "Justin Bieber",
        "Purpose",
        234,
        purposeCover,
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b6/fc/58/b6fc5860-ee45-7966-3e22-d6445acc933e/mzaf_1716189482689106429.plus.aac.p.m4a"
    ),
    new Song(
        4,
        "Sorry",
        "Justin Bieber",
        "Purpose",
        201,
        purposeCover,
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/66/eb/29/66eb29c0-c2f9-d9df-8af3-3bf2562c9d7c/mzaf_4099789285264521999.plus.aac.p.m4a"
    ),
    new Song(
        5,
        "Boyfriend",
        "Justin Bieber",
        "Believe",
        171,
        believeCover,
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/04/bc/13/04bc1303-8bb8-8f20-d92a-d359ef554068/mzaf_14402578973860795369.plus.aac.p.m4a"
    )
];
