import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
const Web3 = require("web3");

var g_provider ;

async function get_provider() {
  const provider = new WalletConnectProvider({
    rpc:{
        //1: "https://mainnet.mycustomnode.com",
        1337: "http://192.168.50.43:8545"
    },
    "chainId":1337,
    "networkId":1337,
    qrcode: true
  });
  await provider.enable();

  return new Promise((resolve) => {
    resolve(provider);
  });
} // get_provider()

async function handleConnect() {
    g_provider = "";
    const my_provider = new WalletConnectProvider({
        rpc:{
            //1: "https://mainnet.mycustomnode.com",
            1337: "http://192.168.50.43:8545"
        },
        "chainId":1337,
        "networkId":1337,
        qrcode: true
      });
    await my_provider.enable();
    alert( "QR code valid") ;
    if ( my_provider ) {
      alert("my_provider valid");
      g_provider = my_provider ;
      const web3 = new Web3(my_provider);
      alert("web3 valid") ;
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      alert( "Account valid") ;
      const balanceInWei = await web3.eth.getBalance(account);
      const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");
      const networkId = await web3.eth.net.getId();
      return new Promise((resolve) => {
        resolve({ provider: my_provider, account: account });
      });
    } // if
    else 
      alert("errror") ;
} // handleConnect()

async function handleSignMessage(s_message) {
    const wallet = new ethers.providers.Web3Provider(g_provider);
    const signer = await wallet.getSigner();
    const signature = await signer.signMessage(s_message);
    await g_provider.disconnect()
    return new Promise((resolve) => {
        resolve(signature);
    });
}



export default {handleConnect, handleSignMessage};

