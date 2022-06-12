const BigNumber = require("bignumber.js");
const decodeAmount = function (value, decimal = 18) {
    const bn = new BigNumber(value)
    return bn.div((10 ** decimal)).toNumber()
}
module.exports  = decodeAmount
