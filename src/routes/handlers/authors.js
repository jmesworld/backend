const MissingBodyParameterError = require('../errors/MissingBodyParameterError')
const MissingQueryParameterError = require('../errors/MissingQueryParameterError')
const getAuthorHandler = require('./authors/getAuthorHandler');
function authorHandler ({ authorManager } = {}) {
    return {
        get: getAuthorHandler(authorManager)
    }
}

module.exports = authorHandler
