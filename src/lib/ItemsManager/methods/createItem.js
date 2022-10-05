const path = require('path')
const fs = require('fs')
async function createItem(createParams){
    const {
        image,
        author,
        title,
        minPrice,
        shares,
        genre,
        about
    } = createParams;
    if(!image) throw new Error('Required item');
    if(!author) throw new Error('Required author');
    if(!title) throw new Error('Required title');
    if(!minPrice) throw new Error('Required minPrice');
    if(!shares) throw new Error('Required shares');
    if(!genre) throw new Error('Required genre');
    if(!about) throw new Error('Required about');


    const item = {
        fileName: `${image.md5}.png`,
        author,
        title,
        minPrice,
        shares,
        genre,
        about
    }

    await image.mv(path.join(__dirname,"../../../items/"+item.fileName));

    return this.itemStore.setItem(item.md5, item);
};
module.exports = createItem;
