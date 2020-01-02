
function gConfigInit() {
    const config = require('../config.json')
    global.gConfig = config
}

function gConfigParamByName(paramName) {
    return global.gConfig[paramName]
}
exports.gConfigInit = gConfigInit
exports.gConfigParamByName = gConfigParamByName