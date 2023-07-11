import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
// import { ethers } from "ethers";
import { Skeleton } from "antd";
import axios from "axios";
import Account from "../components/Account";
import { useContractReader, useOnBlock } from "../hooks";
// import MinusIcon from "../assets/imgs/Minus-Icon.png";
// import AddIcon from "../assets/imgs/Add-icon.png";
import PurplePandaImg from "../assets/imgs/purple-panda-mint.png";
import NFTGif from "../assets/imgs/pppandas-nft.gif";
import Pandas1 from "../assets/imgs/pandas1.png";
import Pandas2 from "../assets/imgs/pandas2.png";
// import RoadMap from "../assets/imgs/PROJECT_ROADMAP.png"

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

const ButtonWrapp = styled.a`
  background: #00d486;
  color: white;
  height: 56px;
  border-radius: 10rem;
   font-size: 17px;
   font-weight:250;
  text-transform: uppercase !important;
  cursor: pointer !important;
  border: solid green 3px;
  width: 30%;
 padding-top:10px
 padding-bottom:5px
  display: flex;
  align-items: center;
  justify-content: center;
  text-align:center;
  

  &:hover {
    color: #207451;
  }

  @media (max-width: 768px) {
    font-size: 12px;
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
  grid-template-columns: 1fr 1fr;
  transform: translate(30px, 0px);
  margin-top: 4rem;
  @media (max-width: 756px) {
    transform: translate(0, 0);
    grid-template-columns: 1fr;
  }
`;

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

const AccountWrap = styled(Account)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatsSkeleton = styled(Skeleton.Button)`
  width: 200px !important;
`;

export default function Mint({
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
 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     const ABI = ["function _totalSupply() public view returns (uint)"];
  //     const mainnetAddress = "0xa440467f6d5fBd62F6eEf01192caA52850Aa1D5F";
  //     const debugContract = new ethers.Contract(mainnetAddress, ABI, localProvider);
  //     const supply = await debugContract.functions._totalSupply();
  //     setCurrentTokens(supply[0].toNumber());
  //     console.log(supply[0].toNumber());
  //   }
  //   fetchData();
  // }, []);

  const balanceV2 = useContractReader(readContracts, "PPPandasV2", "balanceOf", [address]);
  const yourBalanceV2 = balanceV2 && balanceV2.toNumber && balanceV2.toNumber();

  useEffect(() => {
    const updateYourCollectibles = async () => {
      const collectibleUpdate = [];
      for (let tokenIndex = 0; tokenIndex < yourBalanceV2; tokenIndex++) {
        try {
          console.log("Getting token index", tokenIndex);
          const tokenId = await readContracts.PPPandasV2.tokenOfOwnerByIndex(address, tokenIndex);
          console.log("tokenId", tokenId);
          const tokenURI = await readContracts.PPPandasV2.tokenURI(tokenId);
          console.log("tokenURI", tokenURI);

          const ipfsHash = tokenURI.replace("ipfs://", "");
          console.log("ipfsHash", ipfsHash);

          const jsonManifestBuffer = await getFromIPFS(ipfsHash);
          const obj = JSON.parse(jsonManifestBuffer.toString());
          console.log({ obj });
          try {
            const jsonManifest = JSON.parse(jsonManifestBuffer.toString());
            console.log("jsonManifest", jsonManifest);
            collectibleUpdate.push({
              id: tokenId,
              imageWithPath: obj.image.replace("ipfs://", "https://pppandas.mypinata.cloud/ipfs/"),
              owner: address,
              ...jsonManifest,
            });
          } catch (e) {
            console.log(e);
          }
        } catch (e) {
          console.log(e);
        }
      }
      // setYourCollectibles(collectibleUpdate);
    };
    updateYourCollectibles();
  }, [address, yourBalanceV2]);

  const tokenPrice = 0.02;

  return (
    <>
      <Layout id="mint">
        <InnerBox>
          <InnerWrap>
            {/*  Purple Panda Image */}
            <PurplePanda alt="Purple Panda Image" src={PurplePandaImg} />
          </InnerWrap>
          <InnerWrap>
            {/* Text + Minting Wrap */}
            <Heading>Mint Pandas</Heading>
            <InnerBody>
              Pandas are black and white, Asian, and so cute, they make living in this panda-monic life bearable. Pandas
              represent all of us and are for all of us. Now, you can get the opportunity to own, collect, or trade your
              very own panda NFT art on the Ethereum blockchain.
            </InnerBody>
            <MintingWrap>
              <div>
                <div>
                  <NFTPreview src={NFTGif} alt="PPPandas NFT GiF" />

                  <PriceText>Max per Tx 100</PriceText>
                  <PriceText>Only {tokenPrice.toString()} ETH</PriceText>
                </div>
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
                <SoldFont>
                  3999 / 3999 Sold Out
                  {/* {currentTokens === 0 ? <StatsSkeleton active /> : showStats()} */}
                </SoldFont>
                <Center>
                  <ButtonWrap style={{marginRight:'16px'}} href="https://opensea.io/collection/thepppandas" target="_blank">
                    View On OpenSea
                  </ButtonWrap>
                  <ButtonWrapp style={{marginRight:'16px'}} href="https://mintable.app/store/PPPandas-PPPandas/0xa440467f6d5fbd62f6eef01192caa52850aa1d5f
                 " target="_blank">
                  TRADE WITH 0 FEES 
                  <br/>
                   ON MINTABLE
                  </ButtonWrapp>
                </Center>
              </div>
            </MintingWrap>
          </InnerWrap>
        </InnerBox>
        <PandaWrap>
          <PandaImg src={Pandas1} alt="" />
          <PandaImg left src={Pandas2} alt="" />
        </PandaWrap>
        {/* Add Rows of Pandas */}
      </Layout>

      {/* Show Collection */}

     
    </>
  );
}
