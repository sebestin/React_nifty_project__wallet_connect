/* eslint-disable */
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Alert, Button } from "antd";
import "antd/dist/antd.css";
import React, { useCallback, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import "./App.css";
import { INFURA_ID, NETWORK, NETWORKS } from "./constants";
import { Transactor } from "./helpers";
import Splash from "./pages/Splash";
import FAQ from "./pages/FAQ";
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Contract } from "./components";
import Account from "./components/Account";
import Rarity from "./pages/Rarity";
import RarityPals from "./pages/RarityPals";

import Claim from "./pages/Claim"
import Bamboo from "./pages/Bamboo"
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
import {
  useContractLoader,
  useGasPrice,
  useUserSigner,
} from "./hooks";
import Mint from "./pages/Mint";
import MintPals from "./pages/MintPals";
import Roadmap from "./pages/Roadmap";

import { 
    useMoralis
} from "react-moralis";

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

const { BufferList } = require("bl");
const ipfsAPI = require("ipfs-http-client");
const ipfs = ipfsAPI({ host: "ipfs.infura.io", port: "5001", protocol: "https" });
const { ethers } = require("ethers");

/// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS.mainnet;
//  select your target frontend network (localhost, rinkeby, xdai, mainnet)

// 😬 Sorry for all the console logging
const DEBUG = false;
const NETWORKCHECK = true;

// helper function to "Get" from IPFS
// you usually go content.toString() after this...
const getFromIPFS = async hashToGet => {
  // console.log({hashToGet})
  hashToGet = hashToGet.replace("ipfs://", "")
  for await (const file of ipfs.get(hashToGet)) {
    // console.log(file.path);
    if (!file.content) continue;
    const content = new BufferList();
    for await (const chunk of file.content) {
      content.append(chunk);
    }
    // console.log(content);
    return content;
  }
};

// 🛰 providers
if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");

// attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
// Using StaticJsonRpcProvider as the chainId won't change see https://github.com/ethers-io/ethers.js/issues/901
const scaffoldEthProvider = new ethers.providers.JsonRpcProvider(targetNetwork.rpcUrl);

const mainnetInfura = navigator.onLine
  && new ethers.providers.JsonRpcProvider(targetNetwork.rpcUrl)

// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl;
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
if (DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
const localProvider = new ethers.providers.JsonRpcProvider(localProviderUrl);
// console.log({localProvider})
// 🔭 block explorer URL
const blockExplorer = targetNetwork.blockExplorer;

const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID,
      },
    },
  },
});

const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

function App() {

  const mainnetProvider = scaffoldEthProvider && scaffoldEthProvider._network ? scaffoldEthProvider : mainnetInfura;
  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();

  const { isInitialized } = useMoralis()

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "fast");

  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userSigner = useUserSigner(injectedProvider);

  useEffect(() => {
    async function getAddress() {
      if (userSigner) {
        const newAddress = await userSigner.getAddress();
        setAddress(newAddress);
      }
    }
    getAddress();
  }, [userSigner]);

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  const selectedChainId =
    userSigner && userSigner.provider && userSigner.provider._network && userSigner.provider._network.chainId;

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userSigner, gasPrice);
  // Faucet Tx can be used to send funds from the faucet
  const faucetTx = Transactor(injectedProvider, gasPrice);

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(injectedProvider);

  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const writeContracts = useContractLoader(userSigner, { chainId: selectedChainId });

  let networkDisplay = "";

  if (NETWORKCHECK && localChainId && selectedChainId && localChainId !== selectedChainId) {
    const networkSelected = NETWORK(selectedChainId);
    const networkLocal = NETWORK(localChainId);
    if (selectedChainId === 1337 && localChainId === 31337) {
      networkDisplay = (
        <div style={{ zIndex: 2, position: "absolute", right: 0, top: 60, padding: 16 }}>
          <Alert
            message="⚠️ Wrong Network ID"
            description={
              <div>
                You have <b>chain id 1337</b> for localhost and you need to change it to <b>31337</b> to work with
                HardHat.
                <div>(MetaMask -&gt; Settings -&gt; Networks -&gt; Chain ID -&gt; 31337)</div>
              </div>
            }
            type="error"
            closable={false}
          />
        </div>
      );
    } else {
      networkDisplay = (
        <div style={{ zIndex: 2, position: "absolute", right: 0, top: 60, padding: 16 }}>
          <Alert
            message="⚠️ Wrong Network"
            description={
              <div>
                You have <b>{networkSelected && networkSelected.name}</b> selected and you need to be on{" "}
                <Button
                  onClick={async () => {
                    const ethereum = window.ethereum;
                    const data = [
                      {
                        chainId: "0x" + targetNetwork.chainId.toString(16),
                        chainName: targetNetwork.name,
                        nativeCurrency: targetNetwork.nativeCurrency,
                        rpcUrls: [targetNetwork.rpcUrl],
                        blockExplorerUrls: [targetNetwork.blockExplorer],
                      },
                    ];
                    console.log("data", data);
                    const tx = await ethereum.request({ method: "wallet_addEthereumChain", params: data }).catch();
                    if (tx) {
                      console.log(tx);
                    }
                  }}
                >
                  <b>{networkLocal && networkLocal.name}</b>
                </Button>
                .
              </div>
            }
            type="error"
            closable={false}
          />
        </div>
      );
    }
  } else {
    networkDisplay = (
      <div style={{ zIndex: -1, position: "absolute", right: 154, top: 28, padding: 16, color: targetNetwork.color }}>
        {targetNetwork.name}
      </div>
    );
  }

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new ethers.providers.Web3Provider(provider));

    provider.on("chainChanged", chainId => {
      console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    provider.on("accountsChanged", () => {
      console.log(`account changed!`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
      logoutOfWeb3Modal();
    });
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  const myProps = {
   address,
   localProvider: injectedProvider,
   userSigner,
   mainnetProvider: injectedProvider,
   // price,
   web3Modal,
   loadWeb3Modal,
   logoutOfWeb3Modal,
   blockExplorer,
   readContracts,
   getFromIPFS,
   writeContracts,
   tx,
  }

  return (    
    <Web3ReactProvider getLibrary={getLibrary}>             
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Splash />
              <Mint {...myProps} />
              <Rarity />
              <Roadmap />
              <ChakraProvider>
                <FAQ />
              </ChakraProvider>
            </Route>
            <Route exact path="/mint-pppals">
              <Splash />
              <MintPals {...myProps} />
              <RarityPals {...myProps} />
              <Roadmap />
              <ChakraProvider>
                <FAQ />
              </ChakraProvider>
            </Route>
            <Route exact path="/claim">
              {
                  isInitialized &&
                    <>
                        <Claim {...myProps}/>
                        <Bamboo />
                    </>                  
              }
            </Route>
            <Route path="/faucet">
              <div style={{ padding: 32 }}>
                <Account
                  address={address}
                  localProvider={injectedProvider}
                  userSigner={userSigner}
                  mainnetProvider={injectedProvider}
                  // price={price}
                  web3Modal={web3Modal}
                  loadWeb3Modal={loadWeb3Modal}
                  logoutOfWeb3Modal={logoutOfWeb3Modal}
                  blockExplorer={blockExplorer}
                />
                <Button
                  style={{ marginBottom: "4rem" }}
                  type="primary"
                  onClick={() => {
                    faucetTx({
                      to: address,
                      value: ethers.utils.parseEther("3.0"),
                    });
                  }}
                >
                  💰 Grab funds from the faucet ⛽️
                </Button>
              </div>
            </Route>
            <Route path="/debugcontracts">
              <Contract
                name="PPPandas"
                signer={userSigner}
                provider={injectedProvider}
                address={address}
                blockExplorer={blockExplorer}
              />
              <Contract
                name="PPPandasV2"
                signer={userSigner}
                provider={injectedProvider}
                address={address}
                blockExplorer={blockExplorer}
              />
            </Route>
          </Switch>
        </Router>
      </div>      
    </Web3ReactProvider>  
  );
}

export default App;
