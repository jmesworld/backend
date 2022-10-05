const MissingBodyParameterError = require("../../errors/MissingBodyParameterError");


module.exports = function (itemsManager){
  return async function getItem(req, res, next) {
      const {
          path,
          params: {itemIdentifier}
      } = req
      try {
          try {
              const item = await itemsManager.resolveItem({
                  itemIdentifier
              })
              console.log('item', item)
              if (!item.fileName) {
                  throw new Error(`Item ${itemIdentifier} is not registered.`);
              }
              return res.json({item: item, error: false})
          } catch (e) {
              return next(e);
          }
      } catch (e) {
          return next(e);
      }
  }
};
