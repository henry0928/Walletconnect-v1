import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";

// const [address, setAddress] = useState("");
// const [balance, setBalance] = useState("");
// const [network, setNetwork] = useState("");
// const [isConnected, setIsConnected] = useState(false);
// const [signedMessage, setSignedMessage] = useState("");
// const [provider, setProvider] = useState("");
// const [walletEmail, setWalletEmail] = useState("");


const Web3 = require("web3");
let CerthisWalletLib = require("@certhis/certhis-wallet");

let CerthisWallet = CerthisWalletLib.init(
    Web3,
    CoinbaseWalletSDK,
    WalletConnectProvider
);

var address = "";
var balance = "";
var network = "";
var isConnected = false;
var signedMessage = "";
var provider = "";
var walletEmail = "";

const handleConnect = async () => {
    const get_provider = await CerthisWallet.run(
        "1",
        "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    );
    provider = get_provider;
    alert('here22');
    if (get_provider) {
        alert('here');
        const web3 = new Web3(get_provider);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        //setAddress(account);
        const balanceInWei = await web3.eth.getBalance(account);
        const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");
        //setBalance(balanceInEther);
        const networkId = await web3.eth.net.getId();
        //setNetwork(networkId);
        //setIsConnected(true);
        //setWalletEmail(localStorage.getItem("WALLET_EMAIL"));

        alert(account);
    }
};

CerthisWallet.disconnect();
window.provider = null;
alert('a');
handleConnect();
