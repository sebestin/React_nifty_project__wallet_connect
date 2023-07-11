import React, { Component, Fragment, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { DownloadOutlined } from "@ant-design/icons";
import RmIcon1 from "../assets/imgs/roadmap-panda-1.png";
import RmIcon2 from "../assets/imgs/roadmap-panda-2.png";
import RmIcon3 from "../assets/imgs/roadmap-panda-3.png";
import RmIcon4 from "../assets/imgs/roadmap-panda-4.png";
import RmIcon5 from "../assets/imgs/roadmap-panda-5.png";
import RmIcon6 from "../assets/imgs/roadmap-panda-6.png";
import RmIcon7 from "../assets/imgs/roadmap-panda-7.png";
import roadMapImg from "../assets/imgs/PPP PROJECT ROADMAP_1510.png";
import checkmark from "../assets/imgs/checkmark-48.png";
import PurplePandaImg from "../assets/imgs/panda-big.png";
import Pandas1 from "../assets/imgs/pandas3.png";
import { useWeb3React } from "@web3-react/core"
import { injected } from "../components/wallet/connectors"
import { Contract } from '@ethersproject/contracts'
import { AddressZero } from '@ethersproject/constants'
import { getAddress } from '@ethersproject/address'
import { constants } from "../contracts/bamboo";
import { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from "ethers/lib/utils";

import onBlock from "../hooks/OnBlock";
import AccountConnect from "../components/Account";
import { 
    useMoralisWeb3Api,
    useMoralisQuery,
    useMoralis
} from "react-moralis";

const AccountWrap = styled(AccountConnect)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function isAddress(value){
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export default function Claim({
    address,
    localProvider,
    userSigner,
    mainnetProvider,
    web3Modal,
    loadWeb3Modal,
    logoutOfWeb3Modal,
    blockExplorer,
    readContracts,
    tx,
    writeContracts,
    getFromIPFS,
}) {
    const [claimableBalance, setClaimableBalance] = useState(undefined);
    const [balanceBamboo, setBalanceBamboo] = useState(undefined);
    const [usersNFTs, setUsersNFTs] = useState(undefined);
    const [lastClaimedTimeStamps, setLastClaimedTimeStamps] = useState(undefined);

    const [status, setStatus] = useState(0);
    const [symbol, setSymbol] = useState("$BAMBOO");
    const [result, setResult] = useState(0);
    const [txId, setTxId] = useState("");

    const [counter, setCounter] = useState(0)

    /** MORALIS QUERIES DEFINITION */
    const Web3API = useMoralisWeb3Api();
    const { Moralis } = useMoralis();

    const PPPanda = Moralis.Object.extend("PPPanda");
    const runPPPandaQuery = async () => {
        if (usersNFTs) {
            if (usersNFTs.length > 0) {
                const pandaQuery = new Moralis.Query(PPPanda);
                let pandaQueryData = await pandaQuery.containedIn("tokenId", usersNFTs).find();
                if (pandaQueryData && Object.keys(pandaQueryData).length > 0) {
                    setLastClaimedTimeStamps(pandaQueryData.map(p => p.get("lastClaimedTimeStamp")));
                } 
            } else {
                setLastClaimedTimeStamps([])
            }                 
        }        
    }

    let PPPandaMetadataQuery = useMoralisQuery(
        "PPPandaMetadata"
    );
    const BAMBOOClaim = Moralis.Object.extend("BAMBOOClaim");
    const runBambooClaimQuery = async () => {
        const BAMBOOClaimQuery = new Moralis.Query(BAMBOOClaim);
        BAMBOOClaimQuery.equalTo("address", address.toLowerCase());
        BAMBOOClaimQuery.equalTo("confirmed", false);
        BAMBOOClaimQuery.descending("createdAt");
        return await BAMBOOClaimQuery.first();
    }
    

    /** CONNECTION CHECKS */
    const isConnected = () => userSigner !== undefined && address !== undefined;
    const queryDataLoaded = () => 
        usersNFTs && 
        lastClaimedTimeStamps && 
        PPPandaMetadataQuery.data && 
        PPPandaMetadataQuery.data.length > 0

    /** READING DATA */
    // Get claimable balance when users NFTs, pppandas and metadata is loaded
    useEffect(() => {
        calculateClaimableBalance();
    }, [
        JSON.stringify(usersNFTs),
        JSON.stringify(lastClaimedTimeStamps),
        JSON.stringify(PPPandaMetadataQuery.data),
    ]);

    // Get users Panda's when bamboo is loaded and address
    useEffect(() => {
        if (address && readContracts && readContracts.PPPandasV2) {
            const options = { chain: '0x1', address, token_address: readContracts.PPPandasV2.address };
            Web3API.account.getNFTsForContract(options)
                .then(res => setUsersNFTs(res.result.map(n => parseInt(n["token_id"]))))
                .catch(e => console.log(e));
            getUsersBAMBOOBalance();
        }
    }, [address, readContracts])

    // Updates PPPanda Query when usersNFT updates
    useEffect(() => {
        runPPPandaQuery();
    }, [JSON.stringify(usersNFTs)]);

    // Calculate reward
    const calculateClaimableBalance = async () => {        
        if (queryDataLoaded()) {
            console.log("Calculating claimable balance");

            if (result === 1)
                await runPPPandaQuery();

            const PPPandaMetadata = PPPandaMetadataQuery.data[0];
            let reward = BigNumber.from(0); 
                    
            if (lastClaimedTimeStamps && lastClaimedTimeStamps.length > 0) {
                // Get contract data
                const timestamp = (await localProvider.getBlock(await localProvider.getBlockNumber())).timestamp

                // Calculate reward
                reward = lastClaimedTimeStamps.reduce((acc, lastClaimedTimeStamp) => {
                    //let lastClaimedTimeStamp = panda.get("lastClaimedTimeStamp");
                    let deployedTime = PPPandaMetadata.get("deployedTime");

                    let initialIssuance = BigNumber.from(PPPandaMetadata.get("initialIssuance"))
                    let issuancePeriod = BigNumber.from(PPPandaMetadata.get("issuancePeriod"));
                    let issuanceRate = BigNumber.from(PPPandaMetadata.get("issuanceRate"));

                    let timeDiff = BigNumber.from(Math.max(0, timestamp - Math.max(lastClaimedTimeStamp, deployedTime)));
                    
                    let reward = timeDiff.mul(issuanceRate).div(issuancePeriod);
                    
                    if (lastClaimedTimeStamp === 0) {
                        reward = reward.add(initialIssuance);
                    }

                    return acc.add(reward);
                },  reward);             
            }

            setClaimableBalance(formatReward(reward));
            console.log(`Fetched claimable balance ${formatReward(reward)}`)                      
        }
    }

    const getUsersBAMBOOBalance = async () => {
        if (isConnected()) {
            const balance = await readContracts.BAMBOO.balanceOf(address);
            setBalanceBamboo(formatReward(balance));
            console.log(`Fetched BAMBOO balance ${formatReward(balance)}`)
        }
    }

    useEffect(() => {
        checkTx();
    }, [status])

    const formatReward = (reward) => {
        let toStr = reward.toString();
        let weiToEth = formatEther(toStr);
        let decimalSplit = weiToEth.split(".");
        if (decimalSplit.length > 1) {
            return decimalSplit[0] + "." + decimalSplit[1].substring(0, 2)
        } else {
            return weiToEth
        }
    }

    onBlock(localProvider, () => {
        if (address) {
            calculateClaimableBalance();
            getUsersBAMBOOBalance();
        }      
    });

    const checkTx = () => {
        if (localProvider) {
        const txId = localStorage.getItem('PENDING_TX') 
        console.log('txId', txId)
        if (txId && txId != ''){                
            localProvider.getTransactionReceipt(txId).then((receipt) => {
                console.log('getTransactionReceipt', receipt)
                if (receipt) {                                       
                localStorage.setItem('PENDING_TX', "") 
                setStatus(0)   
                setTxId(receipt.transactionHash);
                if (receipt.status == true){
                    setResult(1);      
                } else {
                    setResult(-1);      
                }              
                } else {              
                setTimeout(checkTx, 1000);                                         
                }            
            })
        }      
    } 
    }
    
    const onClickClaim = async (numOfTries=1) => {    
        if (isConnected() && usersNFTs.length > 0) {
            console.log('clicked claim');
            setTxId('');
            setResult(0);

            let sigData = {}
            setStatus(2)
            try {              
                let cloudData = await Moralis.Cloud.run("generateSignature", { address })
                
                if (cloudData && !cloudData.error) {
                    console.log("Generated signature")
                    sigData = cloudData;
                }
            } catch (error) {
                alert("Error occured claiming BAMBOO. Please try again in 10 minutes or submit a support ticket")
                console.log(`Error fetching signature`)
                console.log(error)
                return;
            }

            //console.log(generateSignatureCloudFunction)
            if (Object.keys(sigData).length === 0) {
                try {
                    //await BAMBOOClaimQuery.fetch({ throwOnError: true });
                    let bambooQueryData = await runBambooClaimQuery();
                    if (bambooQueryData && Object.keys(bambooQueryData).length > 0) {
                        sigData = {
                            reward: bambooQueryData.get("reward"),
                            nonce: bambooQueryData.get("nonce"),
                            signature: bambooQueryData.get("signature"),
                            timestamp: bambooQueryData.get("timestamp")
                        };                        
                        console.log("SigData from persistance")
                        console.log(sigData)
                    }
                } catch (error) {
                    alert("Error occured claiming BAMBOO. Please try again in 10 minutes or submit a support ticket")
                    console.log(`Error fetching signature`)
                    console.log(error)
                    return;
                }
            }
            
            if (sigData && sigData.signature && !sigData.error) {                
                console.log(`Claiming ${formatEther(sigData.reward)} $BAMBOO`)
                writeContracts.BAMBOO.claim(
                    BigNumber.from(sigData.reward),
                    sigData.nonce,
                    sigData.timestamp,
                    sigData.signature,
                    { gasLimit: 150000 }
                ).then((response) => {
                    console.log('response', response);
                    localStorage.setItem('PENDING_TX', response.hash);
                    setStatus(1);
                    return response.hash
                })
                .catch((error) => {
                    setStatus(0)
                    // if the user rejected the tx, pass this along
                    if (error?.code === 4001) {
                    alert('Transaction rejected.')
                    } else {
                    // otherwise, the error was unexpected and we need to convey that
                    alert(`Tx failed`)
                    }
                })  
            } else {
                setStatus(0)
                alert("Please try again in 10 minutes")
                console.debug("Sigdata")
                console.log(sigData)     
            }
        } else {
            alert("You're not eligible for $BAMBOO claim.");            
            return;
        }
    }

  return (
    <Wrap id="claim">
      <NavMenu>
        <NavMenuWrap>
          <NavItem href="/">Home</NavItem>
          <NavItem href="/#mint">Mint Pandas</NavItem>
          <NavItem href="/mint-pppals">Mint Pals</NavItem>
          <NavItem href="/#rarity">Rarity</NavItem>
          <NavItem href="/#roadmap">Roadmap</NavItem>
          <NavItem href="/#faq">FAQs</NavItem>
          <SelNavItem href="/claim">Claim Bamboo</SelNavItem>
        </NavMenuWrap>
      </NavMenu>
      <Heading>Claim $BAMBOO Token</Heading>
      <InnerWrap>
            {/*  Purple Panda Image */}
            <PurplePanda alt="Purple Panda Image" src={PurplePandaImg} />
      </InnerWrap>

      <GreenBtnWrap>

        {
            isConnected() &&
            <>
                <Account>Current Balance: {balanceBamboo ? `${balanceBamboo} ${symbol}` : "Loading..."} </Account>
                <Account>Claimable Balance: {claimableBalance ? `${claimableBalance} ${symbol}` : "Loading..."} </Account>
                <Account>PPPanda Balance: {usersNFTs ? `${usersNFTs.length}` : "Loading..."}</Account>
            </>      
        }
      </GreenBtnWrap>     
      {
          isConnected() &&          
          <GreenBtnWrap>
              {
                  queryDataLoaded() ?
                    <>
                        {result == 1 && <Account style={{color: "green"}}>Success! Please check your claim transaction <a target="_blank" href={`https://etherscan.io/tx/${txId}`}>here</a>!</Account>}                        
                        {result == -1 && <Account style={{color: "red"}}>Failed! Please check your claim transaction <a target="_blank" href={`https://etherscan.io/tx/${txId}`}>here</a>!</Account>}
                        <GreenButton onClick={() => onClickClaim(1)} disabled={status == 1}>
                        { status == 0? "Claim $BAMBOO" : status == 1 ? "Processing Claim" : "Please wait for your wallet to pop up"}
                        </GreenButton>
                    </>
                    :
                    <GreenButton disabled={true}>
                        Please wait for your data to load.
                    </GreenButton>
              }            
        </GreenBtnWrap>
      }

      <GreenBtnWrap>
            <AccountWrap
                address={address}
                localProvider={localProvider}
                userSigner={userSigner}
                mainnetProvider={mainnetProvider}
                web3Modal={web3Modal}
                loadWeb3Modal={loadWeb3Modal}
                logoutOfWeb3Modal={logoutOfWeb3Modal}
                blockExplorer={blockExplorer}
            />
        </GreenBtnWrap> 
      <PandaWrap>
          <PandaImg src={Pandas1} alt="" />
          {/* <PandaImg left src={Pandas2} alt="" /> */}
      </PandaWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  padding-top: 4vw;
  //background: rgb(252, 255, 165);
  background: url("PPPandas_Asset_Dot.png");
`;

const Heading = styled.h2`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.7vw;
  color: #292929;
  text-align: center;
  font-weight: bold;
  @media (max-width: 764px) {
    font-size: 5.5vw;
  }
`;

const NavMenu = styled.nav`
  padding: 2rem;
`;

const NavMenuWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: auto;
  padding: 1vw;
  border-radius: 20px;
  width: 55%;
  background-color: #fff;
  @media (max-width: 756px) {
    background: white;
    width: 100%;
    flex-direction: column;
  }
`;

const NavItem = styled.a`
  font-size: 1.2vw;
  color: black;
  @media (max-width: 756px) {
    font-size: 3vw;
    margin: 2vw;
  }
`;

const SelNavItem = styled.a`
  font-size: 1.2vw;
  color: black;
  @media (max-width: 756px) {
    font-size: 3vw;
    margin: 2vw;
  }
`;

const InnerWrap = styled.div`
  justify-content: center;
  margin: 20px auto;
  display: flex;
`;

const PurplePanda = styled.img`
  width: 20%;
  border-radius: 100%;
  //border: solid #761476 3px;
  @media (max-width: 756px) {
    width: 40%;
    margin: 4vw auto;
  }
`;

const GreenButton = styled.button`
  
  background: ${props => props.disabled ? '#808080' : '#00d487'};
  width: 250px;
  font-weight: bold;
  color: black;
  padding: 0.6vw;
  border: solid 10px rgba(252, 255, 205);
  //border:none;
  border-radius: 20px;
  margin: 20px auto;
  font-size: 1.2vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  @media (max-width: 756px) {
    width: 41%;
    font-size: 3vw;
  }

  &:hover {
    color: ${props => props.disabled ? 'black' : 'white'};
  }
`;

const GreenBtnWrap = styled.div`
  display: grid;
`;

const PandaWrap = styled.div`
  justify-content: center;
  display: flex;
  grid-template-columns: 1fr 1fr;
  //transform: translate(30px, 0px);
  margin-top: 4rem;
  @media (max-width: 756px) {
    transform: translate(0, 0);
    grid-template-columns: 1fr;
  }
`;

const PandaImg = styled.img`
  @media (max-width: 756px) {
    width: 100%;
  }
`;

const Account = styled.span`
text-align: center;
font-size: 30px;
`;
