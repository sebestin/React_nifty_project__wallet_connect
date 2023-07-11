import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import P1 from "../assets/imgs/sq-panda-1.png";
import P2 from "../assets/imgs/sq-panda-2.png";
import P3 from "../assets/imgs/sq-panda-3.png";
import P4 from "../assets/imgs/sq-panda-4.png";
import P5 from "../assets/imgs/sq-panda-5.png";
import P6 from "../assets/imgs/sq-panda-6.png";
import P7 from "../assets/imgs/sq-panda-7.png";
import P8 from "../assets/imgs/sq-panda-8.png";
import RarityTablePals from "../components/RarityTablePals";

import rarityDataPandas from "../assets/data/pppandas.json";
import rarityDataPals from "../assets/data/pppals.json";

const Wrap = styled.div`
  background: #ff9a80;
  padding: 4vw 10vw;
`;

const Heading = styled.h2`
  margin-top: 1.5rem;
  font-size: 1.7vw;
  color: #292929;
  text-align: center;
  font-weight: bold;
  @media (max-width: 764px) {
    font-size: 5.5vw;
  }
`;

const PandasWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  @media (max-width: 756px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CollectionWrap = styled.div`
  padding: 1rem;
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
  color: #000;
`;

const PandaImg = styled.img``;

export default function RarityPals({
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
  const [pppandas, setPPPandas] = useState(undefined);
  const [pppals, setPPPals] = useState(undefined);

  const getPandaUrl = id =>
    `https://pppandas.mypinata.cloud/ipfs/QmUn5MHWJScBQH8T8cRG9YdPWYKkwwPypf6v184hcPNt6D/${id}.png`;
  const getPalsUrl = id =>
    `https://d3e5rpfyahovut.cloudfront.net/public/images/${id}.png`;

  // const isConnected = () => userSigner !== undefined && address !== undefined;

  const getPPPandas = async () => {
    console.log("getting users pandas");
    const balance = (await readContracts.PPPandasV2.balanceOf(address)).toNumber();
    const pandas = [];
    for (let i = 0; i < balance; i++) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const tokenId = (await readContracts.PPPandasV2.tokenOfOwnerByIndex(address, i)).toNumber();
        const json = rarityDataPandas.find(rd => {
          return parseInt(rd.id, 10) === tokenId;
        });
        pandas.push({
          id: tokenId,
          imageWithPath: getPandaUrl(tokenId),
          owner: address,
          ...json,
        });
      } catch (e) {
        console.log(e);
      }
    }

    setPPPandas(pandas);
  };

  const getPPPals = async () => {
    console.log("getting users pals");
    const balance = await readContracts.PPPals.balanceOf(address);
    const pals = [];
    for (let i = 0; i < balance; i++) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const tokenId = (await readContracts.PPPals.tokenOfOwnerByIndex(address, i)).toNumber();
        const json = rarityDataPals.find(rd => rd.edition === tokenId);
        pals.push({
          id: tokenId,
          imageWithPath: getPalsUrl(tokenId),
          owner: address,
          ...json,
        });
      } catch (e) {
        console.log(e);
      }
    }

    setPPPals(pals);
  };

  useEffect(() => {
    if (address && readContracts && readContracts.PPPandasV2 && readContracts.PPPals) {
      //getPPPandas();
      //getPPPals();
    }
  }, [address, readContracts]);

  return (
    <>
      <div id="rarity">
        <Wrap>
          <Heading>Rarity</Heading>
          {/*<RarityTablePals />*/}
        </Wrap>
      </div>
      {/*CollectionWrap>
        {pppandas && pppandas.length > 0 && <CollectionHeading>Your Pandas</CollectionHeading>}
        <CollectionListWrap>
          {pppandas &&
            pppandas.length > 0 &&
            pppandas.map(item => {
              return (
                <CollectionItem key={item.id}>
                  <CollectionImg src={item.imageWithPath} alt={item.id} />
                  <CollectionTitle>PPPandas #{item.id}</CollectionTitle>
                </CollectionItem>
              );
            })}
        </CollectionListWrap>
      </CollectionWrap>
      <CollectionWrap>
        {pppals && pppals.length > 0 && <CollectionHeading>Your Pals</CollectionHeading>}
        <CollectionListWrap>
          {pppals &&
            pppals.length > 0 &&
            pppals.map(item => {
              return (
                <CollectionItem key={item.id}>
                  <CollectionImg src={item.imageWithPath} alt={item.name} />
                  <CollectionTitle>{item.name}</CollectionTitle>
                </CollectionItem>
              );
            })}
        </CollectionListWrap>
        </CollectionWrap>*/}
      <PandasWrap>
        <PandaImg src={P1} />
        <PandaImg src={P2} />
        <PandaImg src={P3} />
        <PandaImg src={P4} />
        <PandaImg src={P5} />
        <PandaImg src={P6} />
        <PandaImg src={P7} />
        <PandaImg src={P8} />
      </PandasWrap>
    </>
  );
}
