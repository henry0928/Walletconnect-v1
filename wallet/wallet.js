import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
// import { ethers } from "ethers";

const Web3 = require("web3");
let CerthisWalletLib = require("./@certhis/certhis-wallet");
let CerthisWallet = CerthisWalletLib.init(Web3, CoinbaseWalletSDK, WalletConnectProvider);

// const rpc = "http://140.113.207.39:8546";
const rpc = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

async function handleConnect() {
    await handleDisconnect(); // force to disconnect before reconnect
    const provider = await CerthisWallet.run("1", rpc);
    if (provider) {
        const web3 = new Web3(provider);
        const account = (await web3.eth.getAccounts())[0];
        return new Promise((resolve) => {
            resolve({ account: account });
        });
    }
};

async function handleDisconnect() {
    await CerthisWallet.disconnect();
}

// async function handleSignMessage(res, message) {
//     const wallet = new ethers.providers.Web3Provider(res.provider);
//     const signer = await wallet.getSigner();
//     const signature = await signer.signMessage(message);
//     return new Promise((resolve) => {
//         resolve({ account: res.account, signature: signature });
//     });
// };

async function connect() {
    await handleDisconnect();
    return await handleConnect();
}

export default { connect };
