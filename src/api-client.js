const URL = 'https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=937a337551c44a542ec6cbe526fc0f9e&format=json';

function getArtists() {
    return fetch(URL)
        .then(response => response.json())
        .then(data => data.topartists.artist)
        .then(artists => artists.map(artist => {
            return {
                name: artist.name,
                image: artist.image[3]['#text'],
                likes: 200,
                comments: 140,
            }
        }))
}

export { getArtists }