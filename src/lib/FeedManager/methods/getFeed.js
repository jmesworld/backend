async function getFeed(){
    const list = await this.itemsManager.listItems();
    return list
}
module.exports = getFeed;
