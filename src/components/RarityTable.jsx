import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import collection from "lodash/collection";
import { DebounceInput } from "react-debounce-input";
import rarityData from "../assets/data/pppandas.json";

const Button = styled.button`
  padding: 0.5vw 1.5vw;
  background: #00d486;
  color: white;
  border: solid green 3px;
  border-radius: 10px;
  font-size: 1vw;
  @media (max-width: 765px) {
    font-size: 4vw;
  }
`;

const ImageCard = styled.div`
  background: white;
  border-radius: 15px;
  display: grid;
  align-items: center;
  @media (max-width: 765px) {
    padding: 1rem;
  }
`;

const Image = styled.img`
  margin: 0 auto;
  padding: 2rem;
  border-radius: 3rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 1vw;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 35% 65%;
  margin-top: 2rem;
  @media (max-width: 765px) {
    grid-template-columns: 1fr;
  }
`;

const DataLayout = styled.div`
  padding: 3rem;
  color: #000;
  @media (max-width: 765px) {
    padding: 1.5rem 0;
  }
`;

const GridWrapInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-gap: 1vw;
  background: rgb(255 255 255 / 40%);
  padding: 1vw;
  border-radius: 1rem;
  margin: 6px;
`;

const GridWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-gap: 1vw;
  background: rgb(255 255 255 / 40%);
  padding: 1vw;
  border-radius: 1rem;
  @media (max-width: 765px) {
   display:block;
  }
`;

const RarityWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  margin-bottom: 1vw;
`;

const CardTitleWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-gap: 1vw;
  justify-items: center;
  padding: 1vw 0 0 0;
  font-size: 1vw;
  @media (max-width: 765px) {
    font-size: 4vw;
    padding: 2vw;
  }
`;

const RarityNumber = styled.div`
  background: white;
  padding: 1vw;
  text-align: center;
  font-weight: bold;
  border-radius: 22px;
  font-size: 1.4vw;
  @media (max-width: 765px) {
    font-size: 3vw;
  }
`;

const Input = styled(DebounceInput)`
  border: solid green 3px;
  padding: 0.5vw;
  border-radius: 10px;
  font-size: 1vw;
  text-align: center;
  @media (max-width: 765px) {
    font-size: 4vw;
  }
`;

const ImgCardWarp = styled.div``;

const TraitTitle = styled.div`
  font-weight: bold;
  font-size: 0.9vw;
  @media (max-width: 765px) {
    font-size: 3vw;
  }
`;

const RarityScoreText = styled.div`
  font-size: 1.2vw;
  @media (max-width: 765px) {
    font-size: 4vw;
  }
`;




export default function RarityTable() {
  const [index, setIndex] = useState(0);
  const [currentToken, setCurrentToken] = useState(rarityData[0]);
  

  useEffect(() => {
    console.log({ rarityData });
  }, []);

  const handleClickForward = () => {
    if (index >= 0) {
      setCurrentToken(rarityData[index + 1]);
      setIndex(index + 1);
    }
  };

  const handleClickBackward = () => {
    if (index > 0) {
      setCurrentToken(rarityData[index - 1]);
      setIndex(index - 1);
    }
  };

  const handleIdChange = e => {
    const id = e.target.value;
    console.log({ id });
    if (id === "") {
      const newPanda = collection.filter(rarityData, x => x.id === "1");
      setCurrentToken(newPanda[0]);
    } else if (id <= 3692 && id !== "") {
      const newPanda = collection.filter(rarityData, x => x.id === id);
      setCurrentToken(newPanda[0]);
    }
  };

  // https://pppandas.mypinata.cloud/ipfs/QmUn5MHWJScBQH8T8cRG9YdPWYKkwwPypf6v184hcPNt6D/1.png
  return (
    <>
    <Layout>
      <ImageCard>
        <ImgCardWarp>
          <CardTitleWrap>
            <div>{`${currentToken.collection} #${currentToken.id}`}</div>
            <div>
              <span style={{ fontWeight: "bold" }}>Rank:</span> {currentToken.rank}
            </div>
          </CardTitleWrap>
          {/* {isImageLoading && <Spin size="large" />} */}
          <Image
            width="500vw"
            height="500vw"
            alt="PPPandas"
            src={`https://pppandas.mypinata.cloud/ipfs/QmUn5MHWJScBQH8T8cRG9YdPWYKkwwPypf6v184hcPNt6D/${currentToken.id}.png`}
          />
          <ButtonWrap>
            <Button onClick={handleClickBackward}>
              <ArrowLeftOutlined />
            </Button>
            <div>
              <Input
                debounceTimeout={300}
                onChange={handleIdChange}
                type="text"
                placeholder="Search by ID"
              />
            </div>
            <Button onClick={handleClickForward}>
              <ArrowRightOutlined />
            </Button>
          </ButtonWrap>
        </ImgCardWarp>
      </ImageCard>
      <DataLayout>
        <RarityWrap>
          <RarityScoreText>Rarity Score: </RarityScoreText>
          <RarityNumber>{currentToken.rarity_score}</RarityNumber>
        </RarityWrap>
        <GridWrap>
          {currentToken.traits.map(item => (
            <GridWrapInner key={item.id}>
              <div>
                <TraitTitle>{item.trait_type}</TraitTitle>
                <div> {item.trait_value}</div>
              </div>
              <RarityNumber>{item.rarity_score}</RarityNumber>
            </GridWrapInner>
          ))}
        </GridWrap>
      </DataLayout>
    </Layout>
      
    </>
    
  );
}
