import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";

const Web3 = require("web3");
let CerthisWalletLib = require("./@certhis/certhis-wallet");
let CerthisWallet = CerthisWalletLib.init(Web3, CoinbaseWalletSDK, WalletConnectProvider);

const rpc = "http://192.168.50.43:8545/";
//const rpc = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
var dcsprovider;

async function handleConnect() {
    //alert("handleconnect valid") ;
    await handleDisconnect();
    var chainid = 1337 ;
    console.log('chainid = '+ chainid);
    console.log('rpc = '+rpc);
    const provider = await CerthisWallet.run(chainid, rpc);
    dcsprovider = provider;
    console.log('handleConnect provider = '+provider);
    if (provider) {
        const web3 = new Web3(provider);
        const account = (await web3.eth.getAccounts())[0];
        alert( "account valid" ) ;
        const balanceInWei = await web3.eth.getBalance(account);
        const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");
        const networkId = await web3.eth.net.getId();
        return new Promise((resolve) => {
            resolve({ provider: provider, account: account });
        });
    }
};

async function handleDisconnect() {
    await CerthisWallet.disconnect();
}

async function handleSignMessage(message) {
    const wallet = new ethers.providers.Web3Provider(dcsprovider);
    const signer = await wallet.getSigner();
    const signature = await signer.signMessage(message);
    return new Promise((resolve) => {
        resolve(signature);
    });
};

async function run() {
    await handleDisconnect();
    const connectRet = await handleConnect();
    const signMessageRet = await handleSignMessage(connectRet, '0x8a488f9230548f87ad228aaa9b618c3a7117a3623bc17dee74cd61d758f1d5da');
    return signMessageRet;
}

export default { run,  handleConnect, handleSignMessage};