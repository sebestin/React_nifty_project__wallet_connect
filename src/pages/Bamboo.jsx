import React from "react";
import styled from "styled-components";
import P1 from "../assets/imgs/sq-panda-1.png";
import P2 from "../assets/imgs/sq-panda-2.png";
import P3 from "../assets/imgs/sq-panda-3.png";
import P4 from "../assets/imgs/sq-panda-4.png";
import P5 from "../assets/imgs/sq-panda-5.png";
import P6 from "../assets/imgs/sq-panda-6.png";
import P7 from "../assets/imgs/sq-panda-7.png";
import P8 from "../assets/imgs/sq-panda-8.png";
import { useEffect, useState } from "react";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import collection from "lodash/collection";
import { DebounceInput } from "react-debounce-input";
import rarityData from "../assets/data/pppandas.json";
import PurplePandaImg2 from "../assets/imgs/panda2.png";
import PurplePandaImg3 from "../assets/imgs/panda3.png";
import PurplePandaImg4 from "../assets/imgs/panda4.png";
import PurplePandaImg5 from "../assets/imgs/panda5.png";
import PurplePandaImg6 from "../assets/imgs/panda6.png";

import RoadmapPandaImg from "../assets/imgs/PPPandas_Asset_PandaBig01.png";
import bambooShop from "../assets/imgs/bamboo-shop.png";
import leave from "../assets/imgs/faq-bamboo.png";

const Wrap = styled.div`
  background: url("PPPandas_Asset_Clouds.png") bottom no-repeat , #b1dcf2;
  background-size: 100% auto;
  padding: 4vw 10vw 8vw ;
`;

const Heading = styled.h2`
  margin-top: 1.5rem;
  font-size: 2.7vw;
  color: #000000;
  text-align: left;
  font-weight: bold;
  @media (max-width: 764px) {
    font-size: 5.5vw;
    text-align: center;
    margin-top: 0rem;


  }
`;

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
  //background: white;
  border-radius: 15px;
  //display: grid;
  align-items: center;
  text-align: center;
  @media (max-width: 765px) {
    padding: 1rem;
  }
`;

const ImageCardMobile = styled.div`
  display: none;
  @media (max-width: 765px) {
    display: block;
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
  grid-template-columns: 65% 35%;
  margin-top: 1rem;
  @media (max-width: 765px) {
    grid-template-columns: 1fr;
  }
`;

const DataLayout = styled.div`
  display: flex-col;
  justify-content: left;
  padding: 1rem;
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
  align-items: center;
  grid-gap: 1vw;
  font-size: 1.1vw;
  padding: 1vw;
  border-radius: 1rem;
  @media (max-width: 765px) {
   display:block;
   font-size: 1.5rem;
  }
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



const ContentText = styled.span`
  
  display: inline-block;
  text-align: center;
  @media (max-width: 765px) {
    margin: auto;
    font-size: 4vw;
    display: block;
  }
`;
const ClearFix = styled.div`
  float: none;
  clear: both;
`;
const LeaveImg = styled.span`
  width: 100px;
  display: inline-block;
  text-align: center;
  float: left;
  padding-top: 2.5rem;
  @media (max-width: 765px) {
    float: none;
    display: block;
    width: 200px;
    margin: auto;
    font-size: 4vw;
    padding-top: 0rem;

  }
`;
const RarityScoreText = styled.div`
  width: 90%;
  text-align: center;
  background: rgb(255 255 255 / 60%);
  border-radius: 10px;
  font-size: 1.7vw;
  padding: 0.5vw;
  color: #000000;
  @media (max-width: 765px) {
    margin: auto;
    font-size: 4vw;
    margin-bottom: 1rem;
  }
`;

const InnerBox = styled.div`
  //width: 70%;
  margin: 0 auto;
  //background: white;
  //border: solid #272727 5px;
  //border-radius: 20px;
  padding: 1vw;
  display: grid;
  grid-template-columns: 20% 80%;
  @media (max-width: 756px) {
    width: 100%;
    padding: 0vw;
    grid-template-columns: 1fr;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
`;

const PurplePanda = styled.img`
  width: 80%;
  margin: auto;
  //border-radius: 100%;
  //border: solid #761476 3px;
  @media (max-width: 756px) {
    width: 40%;
    margin: 4vw auto 0;
  }
`;

const PurplePandaBig = styled.img`
  width: 80%;
  margin: auto;
  @media (max-width: 756px) {
    display: none
  }
`;
const PurplePandaBigMobile = styled.img`
  display: none;
  @media (max-width: 756px) {
    width: 80%;
    display: block;
    margin: 4vw auto 0;
  }
`;
const ShopImg = styled.img`
  width: 100%;
`;

const Header = styled.h2`
  margin-left: 2rem;
  font-size: 1.4vw;
  color: #000000;
  text-align: left;
  font-weight: bold;
  @media (max-width: 764px) {
    font-size: 5.5vw;
    text-align: center;
    margin-top:0rem;
    margin-left: 0rem;
  }
`;

const InnerBody = styled.p` 
  background: rgb(255 255 255 / 60%);
  border-radius: 10px;
  padding: 1.6vw;
  font-size: 0.9vw;
  margin-top: 0.5rem;
  @media (max-width: 756px) {
    padding: 1rem;
    font-size: 1.5rem;
  }
`;

const InnerWrap = styled.div`
  align-items: center;
  display: grid;
`;

const PandaWrap = styled.div`
  justify-centent: center;
  display: grid;
`;

const ContentBox = styled.div`
  width: 100%;
  margin-bottom: 4rem;
  background: #f6b1cf;
  border: solid #272727 5px;
  border-radius: 15px;
  padding: 2vw;
  text-align: center;
  font-size: 1.2vw;
  @media (max-width: 756px) {
    font-size: 1.5rem;
  }
`;
const ContentBoxDesktop = styled.div`
  width: 100%;
  margin-bottom: 4rem;
  background: #f6b1cf;
  border: solid #272727 5px;
  border-radius: 15px;
  padding: 2vw;
  text-align: center;
  font-size: 1.2vw;
  @media (max-width: 756px) {
    display: none
  }
`;
const LineBreak = styled.div`
  line-break: anywhere;
`;

const ShopBox = styled.div`
  width: 100%;
  margin-bottom: 4rem;
  text-align: center;
  
`;

export default function Bamboo() {

  return (
    <div id="bamboo">
      <Wrap>
        <Layout>
              <ImageCardMobile>
                    {/*  Purple Panda Image */}
                <PurplePandaBigMobile alt="Purple Panda Image" src={RoadmapPandaImg} />
                <ContentBox>
                $BAMBOO smart contract address: <br/><LineBreak>0x4805F696E71FFC76049fE28a68f6Ded5EF0Af131</LineBreak>
                </ContentBox>
            </ImageCardMobile>
            <DataLayout>
                
                <LeaveImg><PurplePanda alt="Purple Panda Image" src={leave} /></LeaveImg>
                <ContentText>
                  <Heading>What is $Bamboo?</Heading>
                  <RarityScoreText>$BAMBOO Tokens</RarityScoreText>
                </ContentText>
                <ClearFix/>
                <GridWrap>
                $BAMBOO is a utility token for the PPPandas
                ecosystem. $BAMBOO is not an investment or
                security and has no economic value.<br/>
               <b> 1 $BAMBOO = 1 $BAMBOO </b>

                </GridWrap>
                <InnerBox>
                    <InnerWrap>
                        {/*  Purple Panda Image */}
                        <PurplePanda alt="Purple Panda Image" src={PurplePandaImg2} />
                    </InnerWrap>
                    <InnerWrap>
                        {/* Text + Minting Wrap */}
                        <Header>Yield</Header>
                        <InnerBody>
                        Every PPPanda yields 10 $BAMBOO a day for the
                        next 10 years. Feed your PPPandas some $BAMBOO!

                        </InnerBody>
                    </InnerWrap>
                </InnerBox>
                <InnerBox>
                    <InnerWrap>
                        {/*  Purple Panda Image */}
                        <PurplePanda alt="Purple Panda Image" src={PurplePandaImg3} />
                    </InnerWrap>
                    <InnerWrap>
                        {/* Text + Minting Wrap */}
                        <Header>Mint</Header>
                        <InnerBody>
                        Looking for a companion for your PPPanda? All you need is 250 $BAMBOO and you will be able to mint 1 PPPal.
                        </InnerBody>
                    </InnerWrap>
                </InnerBox>
                <InnerBox>
                    <InnerWrap>
                        {/*  Purple Panda Image */}
                        <PurplePanda alt="Purple Panda Image" src={PurplePandaImg4} />
                    </InnerWrap>
                    <InnerWrap>
                        {/* Text + Minting Wrap */}
                        <Header>Customize</Header>
                        <InnerBody>
                          Have a story to tell for your PPPandas/PPPals? 100
                          $BAMBOO and you will be able to write a short
                          description of your PPPandas/PPPals on the
                          blockchain. Want to rename your PPPandas/PPPals? 10
                          $BAMBOO for a cool, custom name for your
                          PPPandas/PPPals.
                        </InnerBody>
                    </InnerWrap>
                </InnerBox>
               
                <InnerBox>
                    <InnerWrap>
                        {/*  Purple Panda Image */}
                        <PurplePanda alt="Purple Panda Image" src={PurplePandaImg6} />
                    </InnerWrap>
                    <InnerWrap>
                        {/* Text + Minting Wrap */}
                        <Header>Shop</Header>
                        <InnerBody>
                          $BAMBOO can be used to purchase physical
                          merchandise and items in BAMBOO SHOP (coming soon).
                        </InnerBody>
                    </InnerWrap>
                </InnerBox>
            </DataLayout>
            <ImageCard>
                    {/*  Purple Panda Image */}
                <PurplePandaBig alt="Purple Panda Image" src={RoadmapPandaImg} />
                <ContentBoxDesktop>
                $BAMBOO smart contract address: <br/>
                <LineBreak>0x4805F696E71FFC76049fE28a68f6Ded5EF0Af131</LineBreak>
                </ContentBoxDesktop>
                <ShopBox>
                  <ShopImg alt="Purple Panda Image" src={bambooShop} />
                </ShopBox>
            </ImageCard>
        </Layout>
      </Wrap>
     
    </div>
  );
}
