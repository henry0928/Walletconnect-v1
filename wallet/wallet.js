import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";

const Web3 = require("web3");
let CerthisWalletLib = require("./@certhis/certhis-wallet");
let CerthisWallet = CerthisWalletLib.init(Web3, CoinbaseWalletSDK, WalletConnectProvider);

// const rpc = "http://140.113.207.39:8546";
const rpc = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

const handleConnect = async () => {
    await handleLogout();
    const provider = await CerthisWallet.run("1", rpc);
    if (provider) {
        const web3 = new Web3(provider);
        const account = (await web3.eth.getAccounts())[0];
        const balanceInWei = await web3.eth.getBalance(account);
        const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");
        const networkId = await web3.eth.net.getId();
        return new Promise((resolve) => {
            resolve({ provider: provider, account: account });
        });
    }
};

const handleLogout = async () => {
    await CerthisWallet.disconnect();
}

const handleSignMessage = async (res, message) => {
    const wallet = new ethers.providers.Web3Provider(res.provider);
    const signer = await wallet.getSigner();
    const signature = await signer.signMessage(message);
    const ret = { account: res.account, signature: signature };
    // alert(`${ret.account} ${ret.signature}`);
    return new Promise((resolve) => {
        resolve(ret);
    });
};


function add(a, b) {
    return a + b;
}

async function run() {
    await handleLogout();
    const connectRet = await handleConnect();
    const signMessageRet = await handleSignMessage(connectRet, "12345");
    return signMessageRet;
}

export default { add, run };

// CerthisWallet.disconnect();
// handleConnect().then((res) => {
//     // return handleSignMessage(res, "12345");
//     const ret = handleSignMessage(res, "12345");
//     return ret;
// });

// process.exit(0);

// (async () => {
//     await handleConnect().then((res) => {
//         // return handleSignMessage(res, "12345");
//         const ret = handleSignMessage(res, "12345");
//         return ret;
//     });
// })();




// alert(x);
// alert(`aaa`);
