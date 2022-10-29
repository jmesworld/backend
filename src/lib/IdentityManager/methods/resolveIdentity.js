
async function resolveIdentity(searchParams = {}){
    const { username, address } = searchParams;

    if(!username && !address) throw new Error('Only username or address search allowed.');

    let item = null;
    if(username){
        item = await this.fileStore.getItem(username)
        item = {...item, username};
    } else {
        const { result, key } =  await this.fileStore.searchItem(address);
        item = {...result, username: key};
    }
    if(!item) return null;
    console.log(`Resolve Identity`, {searchParams}, '=>', {item})
    return item;
};
module.exports = resolveIdentity;
