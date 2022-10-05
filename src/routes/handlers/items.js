const postItemHandler = require('./items/postItemHandler');
const getItemHandler = require('./items/getItemHandler');
const getAllItemHandler = require('./items/getAllItemHandler');
const postOfferHandler = require('./items/postOfferHandler');
const postVoteHandler = require('./items/postVoteHandler');

function itemsHandler({itemsManager, itemsInteractionsManager} = {}) {
    return {
        post: postItemHandler(itemsManager),
        get: getItemHandler(itemsManager),
        getAll: getAllItemHandler(itemsManager),
        postOffer: postOfferHandler(itemsManager),
        postVote: postVoteHandler(itemsInteractionsManager)
    }
}

module.exports = itemsHandler
