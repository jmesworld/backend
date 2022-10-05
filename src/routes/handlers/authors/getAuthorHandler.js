const MissingBodyParameterError = require("../errors/MissingBodyParameterError");
module.exports = function (authorManager) {
    return async function getAuthor (req, res, next) {
        const {
            path,
            params: {
                nickname
            }
        } = req
        try {
            if (!nickname) throw new MissingBodyParameterError(path, 'nickname')

            try {
                const author = await authorManager.resolveAuthor({
                    nickname
                })
                if(!author){
                    throw new Error(`Author ${nickname} is not registered.`);
                }
                return res.json({ author: author, error: false })
            } catch (e) {
                return next(e);
            }
        } catch (e) {
            return next(e);
        }
    }
};
