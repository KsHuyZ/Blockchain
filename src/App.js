import "./App.css";
import Web3 from "web3/dist/web3.min.js";
import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contracts";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });

  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract("Faucet");
      // provider.request({ method: "eth_requestAccounts" });
      if (provider) {
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract
        });
      } else {
        console.error("please install metamask");
      }
    };
    loadProvider();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
      web3Api.web3 || getAccount();
    };
    getAccount();
  }, [web3Api.web3, account]);

  const handleConnectWallet = () => {
    web3Api.provider.request({ method: "eth_requestAccounts" });
  };

  return (
    <div className="faucet-wrapper">
      <div className="faucet">
        <div className="balance-view is-size-2">
          Current Balance <strong>10 ETH</strong>
          <div>
            Welcome <strong>{account ? account : "Account denined"}</strong>
          </div>
        </div>
        <button className="button is-primary mr-5 ml-2">Donate</button>
        <button className="button is-danger  mr-5">Withdraw</button>
        <button className="button is-link  ml-2" onClick={handleConnectWallet}>
          Connect Wallet
        </button>
      </div>
    </div>
  );
}

export default App;
