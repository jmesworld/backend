async function resolveItem(searchParams){
    const { itemIdentifier } = searchParams;

    if(!itemIdentifier) throw new Error('Only name or id search allowed.');
    const item = await this.itemStore.getItem(itemIdentifier);
    // console.log(`Resolve Items`, {searchParams}, '=>', {item})
    return item;
}
module.exports = resolveItem;
