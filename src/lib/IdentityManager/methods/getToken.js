const elliptic = require('elliptic');
const jwt = require('jsonwebtoken');

async function getToken(getTokenParams = {}){
    const { signature, address, ts } = getTokenParams;
    if(!signature) throw new Error('Required signature');
    if(!ts) throw new Error('Required ts');
    if(!address) throw new Error('Required address');
    console.log(`Resolve Identity from ${JSON.stringify({signature, ts, address})}`);
    const identity = await this.resolveIdentity({address});
    console.log({identity});
    const ec = new elliptic.ec('secp256k1');
    const pubKey = ec.keyFromPublic(identity.publicKey, 'hex');

    let isValid = pubKey.verify(ts.toString(), Buffer.from(signature, 'hex'));
    console.log('Validating signature...', isValid);
    if(!isValid) return new Error('Invalid signature');

    //FIXME: secret.
    const TWENTY_DAY_SECONDS = 20*24*60*60;
    const token = jwt.sign({ identity }, 'secret', { expiresIn: TWENTY_DAY_SECONDS });
    return { token };
};

module.exports = getToken;
