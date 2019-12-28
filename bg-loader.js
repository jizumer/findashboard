const request = require('request-promise')

function getRandomArbitrary(min, max) {
    const random = Math.floor(Math.random() * (max - min) + min)
    return random;
}

async function loadRandomBackground() {
    let response = await request('https://pixabay.com/api?key=14755640-aed46ae7e0a198add708d50e4&category=backgrounds&order=latest&pretty=true', { json: true });
    backgroundUrl = response.hits[getRandomArbitrary(0, response.hits.length)].largeImageURL
    return backgroundUrl
}

exports.loadRandomBackground = loadRandomBackground