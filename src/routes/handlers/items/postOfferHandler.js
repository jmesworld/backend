const MissingBodyParameterError = require("../../errors/MissingBodyParameterError");

module.exports = function (itemsManager){
    return async function postOfferHandler(req, res, next) {
        const path = req.path;
        const {image} = Object.assign({},req.files);
        const {
            author,
            title,
            minPrice,
            shares,
            genre,
            about
        } = Object.assign({},req.body);
        try {
            if (!author) throw new MissingBodyParameterError(path, 'author')
            if (!title) throw new MissingBodyParameterError(path, 'title')
            if (!minPrice) throw new MissingBodyParameterError(path, 'minPrice')
            if (!shares) throw new MissingBodyParameterError(path, 'shares')
            if (!genre) throw new MissingBodyParameterError(path, 'genre')
            if (!about) throw new MissingBodyParameterError(path, 'about')

            try {
                const createItem = await itemsManager.createItem({
                    image,
                    author,
                    title,
                    minPrice,
                    shares,
                    genre,
                    about
                })
                return res.json({item: createItem, error: false})

            } catch (e) {
                return next(e);
            }
        } catch (e) {
            console.error({ea2: e});
            return next(e)
        }
    }
};
