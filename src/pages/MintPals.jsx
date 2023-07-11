import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
// import { ethers } from "ethers";
import { Skeleton } from "antd";
import axios from "axios";
import AccountConnect from "../components/Account";
import { useContractReader, useOnBlock } from "../hooks";
import MinusIcon from "../assets/imgs/Minus-Icon.png";
import AddIcon from "../assets/imgs/Add-icon.png";
import PurplePandaImg from "../assets/imgs/purple-panda-mint.png";
import NFTGif from "../assets/imgs/300px-GIF.gif";
import Pandas1 from "../assets/imgs/Full-row.png";
import Pandas2 from "../assets/imgs/pandas2.png";
// import RoadMap from "../assets/imgs/PROJECT_ROADMAP.png"
import { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from "ethers/lib/utils";
import onBlock from "../hooks/OnBlock";

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Account = styled.div`
    text-align: center;
    font-size: 30px;
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

const ButtonWrap = styled.a`
  background: #00d486;
  color: white;
  height: 56px;
  border-radius: 10rem;
  font-size: 1.0vw;
  text-transform: uppercase !important;
  cursor: pointer !important;
  border: solid green 3px;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align:center;
  

  &:hover {
    color: #207451;
  }

  @media (max-width: 768px) {
    font-size: 3vw;
    width:50%;
  }
`;

const Layout = styled.div`
  background: #b0dcf3;
  padding: 4vw 4vw 0;
  @media (max-width: 756px) {
    padding: 11vw 4vw 0;
  }
`;

const PandaWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  transform: translate(30px, 0px);
  margin-top: 4rem;
  @media (max-width: 756px) {
    transform: translate(0, 0);
    grid-template-columns: 1fr;
  }
`;

const dataWrap = styled.div`
    display: grid;
`

const PandaImg = styled.img`
  ${props =>
    props.left &&
    css`
      margin-left: -60px;
      @media (max-width: 756px) {
        display: none;
      }
    `}
`;

const NFTPreview = styled.img`
  margin: 2vw auto;
  width: 25%;
  @media (max-width: 756px) {
    width: 80%;
  }
`;

const InnerBox = styled.div`
  width: 70%;
  margin: 0 auto;
  background: white;
  border: solid #272727 5px;
  border-radius: 20px;
  padding: 2vw;
  display: grid;
  grid-template-columns: 20% 80%;
  color: #000;
  @media (max-width: 756px) {
    width: 85%;
    padding: 5vw;
    grid-template-columns: 1fr;
  }
`;

const PurplePanda = styled.img`
  width: 80%;
  border-radius: 100%;
  border: solid #761476 3px;
  @media (max-width: 756px) {
    width: 40%;
    margin: 4vw auto;
  }
`;

const InnerBody = styled.p`
  font-size: 0.9vw;
  margin-top: 1rem;
  color: #000;
  @media (max-width: 756px) {
    font-size: 2.5vw;
  }
`;

const InnerWrap = styled.div``;

const Heading = styled.h2`
  font-size: 1.5vw;
  font-weight: 500;
  @media (max-width: 756px) {
    font-size: 4vw;
  }
`;

const MintingWrap = styled.div`
  width: 80%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MintBtn = styled.button`
  margin: 2rem 0;
  background: #00d486 !important;
  color: white !important;
  padding: 0.5rem 1.7rem !important;
  cursor: pointer;
  text-transform: uppercase;
  width: 150px;
  height: 56px;
  font-size: 1.2vw;
  justify-self: self-start;
  border-radius: 0rem 10rem 10rem 0rem !important;
  font-weight: bold;
  border: solid #008001 3px;
  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;

const CollectionWrap = styled.div`
  padding: 3rem;
  background: #d3b0f2;
`;

const CollectionHeading = styled.h2`
  margin-top: 1.5rem;
  font-size: 1.7vw;
  color: #292929;
  text-align: center;
  font-weight: bold;
  @media (max-width: 764px) {
    font-size: 5.5vw;
  }
`;

const CollectionListWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3rem;
  margin-top: 2rem;
  @media (max-width: 765px) {
    grid-template-columns: 1fr;
  }
`;

const CollectionImg = styled.img`
  width: 65%;
  border-radius: 1rem;
  margin: 0 auto;
`;

const CollectionItem = styled.div``;

const CollectionTitle = styled.div`
  font-size: 1vw;
  margin-top: 2rem;
  color: #292929;
  text-align: center;
  @media (max-width: 765px) {
    font-size: 3vw;
  }
`;

const CounterWrap = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
`;

const Counter = styled.div`
  background: #00d486;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  justify-self: self-end;
  padding: 0.5rem;
  color: white;
  border-radius: 3rem 0 0 3rem;
  height: 56px;
  border: solid #008001 3px;
  border-right: 0;
`;

const CounterInt = styled.div`
  margin: 0 0.5rem;
  font-size: 1.3vw;
  display:flex;
  width: 30px;
  text-align: center;
  font-weight: bold;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  @media (max-width: 768px) {
    font-size: 3.5vw;
  }
`;

const CounterIcon = styled.img`
  cursor: pointer;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  max-width: 45%; 
`;

const SoldFont = styled.div`
  font-size: 1.3vw;
  margin-top: 2rem;
  text-align: center;
  padding-bottom: 2vw;
  color: #000;
  @media (max-width: 765px) {
    font-size: 3vw;
  }
`;

const PriceText = styled.div`
  text-align: center;
  font-size: 1vw;
  color: #000;
  @media (max-width: 768px) {
    font-size: 3vw;
  }
`;

const AccountWrap = styled(AccountConnect)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatsSkeleton = styled(Skeleton.Button)`
  width: 200px !important;
`;

export default function MintPals({
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
    const [bambooBalance, setBambooBalance] = useState(undefined); // BN
    const [pppandaBalance, setPPPandaBalance] = useState(undefined); // BN
    const [pppalsBalance, setPPPalsBalance] = useState(undefined); // BN
    const [userMinted, setUserMinted] = useState(undefined); // BN
    const [totalMinted, setTotalMinted] = useState(undefined); // BN

    const maxSupply = 6363;
    const maxPerUser = 100;
    const tokenPrice = BigNumber.from(10).pow(18).mul(250);

    const [amount, setAmount] = useState(100); 
    const [status, setStatus] = useState(0);
    const [result, setResult] = useState(0);
    const [txId, setTxId] = useState("");

  
      
  

    const twoDecimals = str => {
        //console.log(str)
        const split = str.split(".");
        //console.log(split)
        if (split.length > 1) {
          return split[0] + "." + split[1].substring(0, 2);
        } else {
          return str;
        }
      };

    const isConnected = () => userSigner !== undefined && address !== undefined;
    const dataLoaded = () => 
        bambooBalance && 
        pppandaBalance &&
        pppalsBalance &&
        userMinted &&
        totalMinted

    const hasUserEnoughBamboo = () => {
        return bambooBalance.gt(0) && amount > 0 && bambooBalance.gte(tokenPrice.mul(amount));
    }

    const getMaxMintForUser = () => {
      // debugger
        if (dataLoaded())
            return Math.max(100, Math.min(bambooBalance.div(tokenPrice).toNumber(), Math.min(maxSupply - totalMinted.toNumber(), maxPerUser - userMinted.toNumber())))
            
            return 0;
    }

    const getUserData = () => {
        //console.log(readContracts)
        if (address && readContracts && readContracts.BAMBOO && readContracts.PPPandasV2 && readContracts.PPPals && readContracts.PPPalsSales) {
            readContracts.BAMBOO.balanceOf(address)
                .then(balance => {
                    console.log(`Fetched $BAMBOO balance: ${balance.toString()}`)
                    setBambooBalance(balance)
                })
                .catch(e => {
                    console.log("Error fetching $BAMBOO balance")
                    console.log(e)
                })

            readContracts.PPPandasV2.balanceOf(address)
                .then(balance => {
                    console.log(`Fetched PPPanda balance: ${balance.toString()}`)
                    setPPPandaBalance(balance)
                })
                .catch(e => {
                    console.log("Error fetching PPPanda balance")
                    console.log(e)
                })

            readContracts.PPPals.balanceOf(address)
                .then(balance => {
                    console.log(`Fetched PPPals balance: ${balance.toString()}`)
                    setPPPalsBalance(balance)
                })
                .catch(e => {
                    console.log("Error fetching PPPals balance")
                    console.log(e)
                })
            
            readContracts.PPPalsSales.mintsPerAddress(address)
                .then(mints => {
                    console.log(`Fetched pppals mints of ${address}: ${mints.toString()}`)
                    setUserMinted(mints)
                })
                .catch(e => {
                    console.log("Error fetching mintsPerAddress")
                    console.log(e)
                })

            readContracts.PPPalsSales.minted()
                .then(mints => {
                    console.log(`Fetched total mints: ${mints.toString()}`)
                    setTotalMinted(mints)
                })
                .catch(e => {
                    console.log("Error fetching total mints")
                    console.log(e)
                })
        }
    }

    // Read contract data on mount
    useEffect(() => {
        getUserData();
    }, [address, readContracts]);


    onBlock(localProvider, () => {
        if (address) {
            getUserData();
        }      
    });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);  

    useEffect(() => {
        checkTx();
    }, [status])

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

  const mint = async () => {
    if (!isConnected() || !dataLoaded()) {
        alert("Please wait for your balances to load");
        return;
    }

    if (!hasUserEnoughBamboo()) {
        alert("You don't have enough $BAMBOO to burn.");
        return;
    }

    if (getMaxMintForUser() === 0) {
        alert("You cannot mint any more pppals");
        return;
    }

    console.log("Mint TX")
    writeContracts.PPPalsSales.mintWithBAMBOO(
        amount
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
  }

//   const addAmount = () => {
//     if (amount <100) {
//         setAmount(a => a + 1) 
    
//     }
// }

   const addAmount = () => {

       if (amount < getMaxMintForUser()) {
  
          setAmount(a =>  a + 1) 
      
      }
  }

  const substractAmount = () => {
    if (amount > 1) {
        setAmount(a => a - 1) 
     
    }
  }

  return (
    <>
      <Layout id="mint">
        <InnerBox>
        <InnerWrap>
            {/*<PurplePanda alt="Purple Panda Image" src={PurplePandaImg} />*/}
         </InnerWrap>
          <InnerWrap>
            {/* Text + Minting Wrap */}
            <MintingWrap>
                <Center>
                <Heading>Mint PPPals</Heading>                
                </Center>
                <Center>
                    <p>
                    PPPals are companion NFTs for PPPandas. PPPals are Red Pandas, which means they love bamboo as much as PPPandas! Our PPPandas NFT generate $BAMBOO daily, so you can use $BAMBOO to mint free PPPals here!</p>                    
                </Center>
                <br/>
                <Center>
                    <p>Head to the "Claim Bamboo" tab for more $BAMBOO details.</p>
                </Center>
              <div>
                <div>
                  <NFTPreview src={NFTGif} alt="PPPandas NFT GiF" />

                  <PriceText>Max per Tx {maxPerUser}</PriceText>
                  <PriceText>Only {twoDecimals(formatEther(tokenPrice.toString()))} $BAMBOO</PriceText>
                </div>                
               {
                   isConnected() &&                                             
                   (dataLoaded() 
                
                   ?
                   <>                                    
                        <>
                            <br/>
                            <Account>PPPanda Balance: {pppandaBalance.toString()}</Account>                            
                            <Account>PPPals Balance: {pppalsBalance.toString()} </Account>                            
                            <Account>$BAMBOO Balance: {twoDecimals(formatEther(bambooBalance.toString()))}</Account>                         
                        </>                        
                   </>
                   :
                   <>
                        <br/>
                         <Account>PPPanda Balance: Loading...</Account>                        
                        <Account>PPPals Balance: Loading...</Account>                        
                        <Account>$BAMBOO Balance: Loading...</Account> 
                       
                   </>)                                   
                }
                <Center>
                        {result == 1 && <Account style={{color: "green"}}>Success! Please check your transaction <a target="_blank" href={`https://etherscan.io/tx/${txId}`}>here</a>!</Account>}                        
                        {result == -1 && <Account style={{color: "red"}}>Failed! Please check your transaction <a target="_blank" href={`https://etherscan.io/tx/${txId}`}>here</a>!</Account>}
                        { status == 1 && <Account style={{color: "red"}}>Burning {formatEther(tokenPrice.mul(amount).toString())} $BAMBOO for {amount} PPPals...</Account>}
                </Center>
            
                {
                    isConnected() &&
                    

                    <Center>
                        <CounterWrap>                    
                            <Counter>
                                <CounterIcon src={MinusIcon} onClick={substractAmount} />                                              
                                <CounterInt>{amount}</CounterInt>                                    
                                <CounterIcon style={{marginLeft:'20px'}}src={AddIcon} onClick={addAmount} />
                            </Counter>
                            <MintBtn onClick={mint}>
                            Mint
                        </MintBtn>  
                        </CounterWrap>                                      
                    </Center>
                }
                
                <Center>
                   {
                       dataLoaded() &&
                        <SoldFont>
                            {totalMinted.toString()} / {maxSupply} Minted
                        </SoldFont>
                    }
                </Center>

                 <Center>
                  <ButtonWrap href="https://opensea.io/collection/thepppals" target="_blank">
                    View On OpenSea
                  </ButtonWrap>
                </Center>
                 
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
              </div>
            </MintingWrap>
          </InnerWrap>
        </InnerBox>
        <PandaWrap>
          <PandaImg src={Pandas1} alt="" />
          {/*<PandaImg left src={Pandas2} alt="" />*/}
        </PandaWrap>
        {/* Add Rows of Pandas */}
      </Layout>

      {/* Show Collection */}

     
    </>
  );
}
