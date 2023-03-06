import React, { useState, useEffect } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";

const Web3 = require("web3");
let CerthisWalletLib = require("@certhis/certhis-wallet");

function App() {
  let CerthisWallet = CerthisWalletLib.init(
    Web3,
    CoinbaseWalletSDK,
    WalletConnectProvider
  );

  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [network, setNetwork] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [signedMessage, setSignedMessage] = useState("");
  const [provider, setProvider] = useState("");
  const [walletEmail, setWalletEmail] = useState("");
  const handleConnect = async () => {
    const get_provider = await CerthisWallet.run(
      "1",
      "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    );
    setProvider(get_provider);
    if (get_provider) {
      const web3 = new Web3(get_provider);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      setAddress(account);
      const balanceInWei = await web3.eth.getBalance(account);
      const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");
      setBalance(balanceInEther);
      const networkId = await web3.eth.net.getId();
      setNetwork(networkId);
      setIsConnected(true);
      setWalletEmail(localStorage.getItem("WALLET_EMAIL"));
    }
  };

  const handleSignMessage = async (message) => {
    const wallet = new ethers.providers.Web3Provider(provider);
    const signer = await wallet.getSigner();
    const message_sign = await signer.signMessage(message);
    setSignedMessage(message_sign);
  };

  const handleWalletInfos = async () => {
    await CerthisWallet.walletInfos();
  };

  const handleLogout = async () => {
    await CerthisWallet.disconnect();
    window.provider = null;
    setIsConnected(false);
    setAddress("");
    setBalance("");
    setNetwork("");
    // location.reload();
  };

  return (
    <View style={styles.app}>
      <View style={styles.header}>
        <Text style={styles.title}>Certhis Wallet</Text>
      </View>

      {!isConnected ? (
        <Button onPress={handleConnect} title="Connect Wallet" />
      ) : (
        <Button onPress={handleLogout} style={styles.button} title="Logout" />
      )}

      {address && (
        <View>
          <Text>Connected Address: {address}</Text>
          <Text>Balance: {balance} ETH</Text>
          <Text>Connected Network: {network}</Text>
        </View>
      )}

      {isConnected && (
        <Button
          onPress={() => handleSignMessage("Test Message")}
          title="Sign Message"
        />
      )}

      {signedMessage && (
        <View>
          <Text>signedMessage : {signedMessage}</Text>
        </View>
      )}

      {walletEmail && (
        <Button title="Wallet Infos" onPress={() => handleWalletInfos()} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500
  },
  logo: {
    height: 80
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center"
  },

  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  link: {
    color: "#1B95E0"
  },
  code: {
    fontFamily: "monospace, monospace"
  }
});

export default App;
