const ethers = require('ethers');
const bip39 = require('bip39');
const Web3 = require('web3');
const decodeAmount = require('../../utils/decodeAmount')
const DEFAULT_MNEMONIC = "hour ranch impose useless prison else struggle script correct want debate armed term river phone book canal mail boy during inject maze enemy profit";


const mnemonicToSeed = async (mnemonic, password = "") => {
    // @ts-ignore
    const seed = await bip39.mnemonicToSeed(mnemonic, password);
    return Buffer.from(seed).toString("hex");
};

class FaucetManager {
    constructor(props = {}) {
        this.web3 = null;
        this.mnemonic = (props.mnemonic) ? props.mnemonic : DEFAULT_MNEMONIC;
        this.privateKey = (props.privateKey) ? props.privateKey : null;
    }
    async init(props = {}){
        const host = 'http://3.72.109.56:8545';
        console.log(`Connecting to faucet: ${host}`);
        const web3 = new Web3(
            // new Web3.providers.HttpProvider('http://jmes_node:8545')
            new Web3.providers.HttpProvider(host)
        );

        const password = (props.password)? props.password : "";


        console.log('Mnemonic:',this.mnemonic)
        const seed =  await mnemonicToSeed(this.mnemonic, password) ;

        const privateKey = this.privateKey || seed;
        this.account = web3.eth.accounts.privateKeyToAccount(privateKey, true);
        console.log(this.account)
        console.log('Faucet Address:', this.account.address)
        this.web3 = web3;
        const balance = await this.getBalance(this.account.address)
        console.log(`Balance: ${Web3.utils.fromWei(balance.toString())} JMES (${balance})`)
    }

    async getBalance(address){

        const balance = await this.web3.eth.getBalance(address);
        console.log(`web3/request_getBalance(${address})`)
        return balance;
    }
    generateMnemonic(){
        const generateMnemonic = async () => {
            const randomBytes = crypto.getRandomValues(new Uint8Array(32));
            console.log(randomBytes);
            const mnemonic = ethers.utils.entropyToMnemonic(randomBytes);
            console.log(mnemonic);
            return mnemonic;
        };
    }
    async sendTransaction(transactionParams = {}){

        const {address, amount} = transactionParams
        if(!address) throw new Error('Missing address');
        if(!amount) throw new Error('Missing amount');
        const value = Web3.utils.toWei(amount.toString(), 'ether').toString()
        const balance = await this.getBalance(this.account.address)
        if(balance<amount){
            throw new Error(`Unsufficiant amount ${balance}<${amount}`)
        }
        console.log(`Sending ${value} to ${address}`)
        console.log({balance, value, address})

        try {
            const tx = await this.account.signTransaction({
                to: address,
                from: this.account.address,
                // nonce: datas.nonce,
                value: value,
                gasPrice: parseInt("11806708705"),
                gasLimit: 21000,
            });
            console.log(tx);
            const res = await this.web3.eth.sendSignedTransaction(tx.rawTransaction);
            console.log(res);
            return res;
        } catch (e){
            console.error(e);
            throw e;
        }
    }
};
module.exports = FaucetManager;
