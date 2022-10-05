module.exports = function (feedManager) {
    return async function getFeed(req, res, next) {
        try {
            const feed = await feedManager.getFeed();
            return res.json({feed: feed, error: false})
        } catch (e) {
            return next(e);
        }
    }
};
