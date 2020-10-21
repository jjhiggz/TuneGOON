const queryParams = new URLSearchParams( window.location.search )
const searchString = queryParams.get( 'search' )

function searchAPI( searchString, startingIndex ){
    return fetch(`https://rapidapi.p.rapidapi.com/search?q=${searchString}&index=${startingIndex}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "63d0054208msh39803075a61098dp198efbjsn5eb40ada2724"
        }
    })
}

const maxResults = 200
arrayOfFetches = []

for( let index = 1; index < maxResults; index = index + 25 ){
    arrayOfFetches.push(searchAPI(searchString, index))
}

Promise.all( arrayOfFetches )
    .then( responses => Promise.all(responses.map( response => response.json( ) )))
    .then( allSongStructures => {
        allSongStructures.forEach(songStructure => {
            populateSongResults( songStructure.data )
        })
    })

function populateSongResults(songs){
    console.log(songs)
    const $songResults = document.querySelector('#song-results-container')

    songs.forEach(song => {
        $songResults.append(makeSongCard(song))
    })
}

function makeSongCard(song){
    let $newCard = document.createElement('div')
    $newCard.className = "card"
    $newCard.innerHTML = `
        <img src="${song.album.cover}">
        <h1>${song.title}</h1>
    `

    return $newCard

}