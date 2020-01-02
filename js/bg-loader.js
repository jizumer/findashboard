const request = require('request-promise')
const gConfig = require('./config')

function getRandomArbitrary(min, max) {
    const random = Math.floor(Math.random() * (max - min) + min)
    return random;
}

async function loadRandomBackground() {
    let url = gConfig.gConfigParamByName("background.api.url") + gConfig.gConfigParamByName("background.api.key")
    let response = await request(url, { json: true });
    backgroundUrl = response.hits[getRandomArbitrary(0, response.hits.length)].largeImageURL
    return backgroundUrl
}

exports.loadRandomBackground = loadRandomBackground