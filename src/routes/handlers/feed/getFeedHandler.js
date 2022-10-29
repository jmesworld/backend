const jwt = require('jsonwebtoken');
module.exports = function (feedManager) {
    return async function getFeed(req, res, next) {
        try {
            const feed = await feedManager.getFeed();

            const authHeader = req.headers.authorization;
            const token = authHeader.match(/(bearer)\s+(\S+)/i)[2]
            const decoded = jwt.decode(token, { complete: false })

            console.log({decoded});
            return res.json({feed: feed, error: false})
        } catch (e) {
            return next(e);
        }
    }
};
