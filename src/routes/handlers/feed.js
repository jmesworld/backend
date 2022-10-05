const MissingBodyParameterError = require('../errors/MissingBodyParameterError')
const MissingQueryParameterError = require('../errors/MissingQueryParameterError')

const getFeedHandler = require('./feed/getFeedHandler');

function feedHandler ({ feedManager } = {}) {
    return {
        get: getFeedHandler(feedManager)
    }
}

module.exports = feedHandler
