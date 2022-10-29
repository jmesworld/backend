const MissingBodyParameterError = require("../../errors/MissingBodyParameterError");
const jwt = require("jsonwebtoken");

module.exports = function (itemsInteractionsManager){
    return async function postVoteHandler(req, res, next) {
        const {
            path,
            params: {itemIdentifier},
            body: { direction}
        } = req
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.match(/(bearer)\s+(\S+)/i)[2]
            const decoded = jwt.decode(token, { complete: false })
            const userIdentifier = decoded.identity.username;

            console.log({itemIdentifier,userIdentifier, direction});
            await itemsInteractionsManager.updateItemVote({itemIdentifier, userIdentifier, direction});
            return res.json({error: false})
        } catch (e) {
            console.error({ea2: e});
            return next(e)
        }
    }
};
