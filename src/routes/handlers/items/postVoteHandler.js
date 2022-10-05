const MissingBodyParameterError = require("../../errors/MissingBodyParameterError");

module.exports = function (itemsInteractionsManager){
    return async function postVoteHandler(req, res, next) {
        const {
            path,
            params: {itemIdentifier},
            body: {userIdentifier, direction}
        } = req
        try {
            console.log({itemIdentifier,userIdentifier, direction});
            await itemsInteractionsManager.updateItemVote({itemIdentifier, userIdentifier, direction});
            return res.json({error: false})
        } catch (e) {
            console.error({ea2: e});
            return next(e)
        }
    }
};
