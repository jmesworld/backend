const MissingBodyParameterError = require("../../errors/MissingBodyParameterError");


module.exports = function (itemsManager) {
    return async function getAllItem(req, res, next) {
        const {
            path,
        } = req
        try {
            const items = await itemsManager.listItems();
            console.log({items})
            return res.json({items: items, error: false})
        } catch (e) {
            return next(e);
        }

    }
};
