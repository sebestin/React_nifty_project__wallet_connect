import React,{useState, useEffect} from "react";
import styled from "styled-components";
import { Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import Bamboo from "../assets/imgs/faq-bamboo.png";
import Peep from "../assets/imgs/Peep.png";
import BeepBeep from "../assets/imgs/BeepBeep.png";

import Instagram from "../assets/imgs/ig-icon.png";
import Discord from "../assets/imgs/discord-icon.png";
import Twitter from "../assets/imgs/twitter-icon.png";
import Tiktok from "../assets/imgs/Tiktok1.png";
import "./FAQ.css";

const Title = styled.h2`
  font-size: 4vw;
  text-align: center;
  color: white;
  padding-top: 3vw;
`;

const SectionWrap = styled.div`
  background: #d099c4;
  a{
    color: #1890ff!important;
  }
`;

const FAQWrap = styled.div`
  padding: 3vw 9vw;
`;

const QuestionWrap = styled(Box)`
  font-size: 1.3vw;
  font-weight: 500;
  color: white;
  @media (max-width: 768px) {
    font-size: 3vw;
  }
 
`;

const AnswerWrap = styled(AccordionPanel)`
  font-size: 0.9vw;
  color: white;
  @media (max-width: 768px) {
    font-size: 2vw;
  }
`;

const Answer = styled.p`
  margin-bottom: 2rem;
  padding-left:10px;
  // text-align:justify;
`;

const AccordionItemWrap = styled(AccordionItem)`
  margin-bottom: 2rem;
`;

export default function FAQ() {


  const [isMobile, setIsMobile] = useState(false)

  //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 720) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }
  
  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  return (
    <div id="faq">
      <SectionWrap>
        <Title>FAQ</Title>
        <FAQWrap>
          <Accordion>
            <AccordionItemWrap>
              <h2>
                <AccordionButton>
                  <QuestionWrap flex="1" textAlign="left" textTransform="uppercase">
                    Do you have a verified contract?
                  </QuestionWrap>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AnswerWrap pb={4}>
                <img src={Bamboo} alt="Bamboo" style={{ width: "4%" }} />
                <Answer>
                  Yes. You can view it on{" "}
                  <a
                    target="_blank"
                    href="https://etherscan.io/address/0xa440467f6d5fbd62f6eef01192caa52850aa1d5f"
                    rel="noreferrer"
                    style={{ color: "#63eaff" }}
                  >
                    0xa440467f6d5fbd62f6eef01192caa52850aa1d5f
                  </a>
                </Answer>
              </AnswerWrap>
            </AccordionItemWrap>
            <AccordionItemWrap>
              <h2>
                <AccordionButton>
                  <QuestionWrap flex="1" textAlign="left">
                    WHAT ARE PPPANDAS?
                  </QuestionWrap>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AnswerWrap pb={4}>
                <img src={Bamboo} alt="Bamboo" style={{ width: "4%" }} />
                <Answer>
                PPPandas is a collection of non-fungible tokens or NFTs, programmatically and randomly generated on the Ethereum blockchain.
                The collection consists of 3,999 uniquely generated pandas as NFT art, each with its own distinctive features, facial expressions, accessories, and backgrounds.
                </Answer>
                <Answer>
                Pandas are black and white, Asian, and so cute, they make living in this panda-monic life bearable.
                Pandas represent all of us and are for all of us. Now, you can get the opportunity to own, collect, or trade your very own panda NFT art on the Ethereum blockchain.
                </Answer>
              </AnswerWrap>
            </AccordionItemWrap>

            <AccordionItemWrap>
              <h2>
                <AccordionButton>
                  <QuestionWrap flex="1" textAlign="left">
                    WHAT ARE PPPALS?
                  </QuestionWrap>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AnswerWrap pb={4}>
                <img src={Bamboo} alt="Bamboo" style={{ width: "4%" }} />
                <Answer>
                  PPPals are companions to your PPPandas. PPPals can be minted using 250 $BAMBOO and $BAMBOO can be earned by holding PPPandas in your wallet. Alternatively, you will be able to purchase $BAMBOO from DEXes like Uniswap.
                </Answer>
              </AnswerWrap>
            </AccordionItemWrap>

            <AccordionItemWrap>
              <h2>
                <AccordionButton>
                  <QuestionWrap flex="1" textAlign="left">
                    PPPANDAS TEAM
                  </QuestionWrap>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AnswerWrap pb={4}>
                <img src={Bamboo} alt="Bamboo" style={{ width: "4%" }} />
                <Answer>
                PPPandas team started off as two female friends on their first venture into the NFT space together. 
                Now it is their mission to introduce more females (and cute NFTs uwu) into this male-dominated crypto world and promote diversification. Weapon of choice? PPPandas.
                </Answer>
                <Answer>
                What does “PPPandas” stand for? A lot of you have been asking. Truthfully it stood for PowerPuffPandas. Before you cringe, we did. Which is why we are now PPPandas.
                </Answer>
                <Answer>
                  Together, they decide to join the crypto community to bring diversity to the male-dominant crypto
                  world. As creative technologists, Peep and Beep are bringing PPPandas to the world to create a unique
                  experience for its users.
                </Answer>
                <div style={{display:"flex"}}>
                <img src={BeepBeep} alt="Bamboo" style={{ width: `${isMobile ? `32%`: `15%`}` , height:`${isMobile ? `32%` :`15%`}` }} />
                <Answer style={{marginBottom:"0px"}}>
                <p>BeepBeep</p> <li>Project Manager / PPPandas co-founder </li>An avid Crypto trader/NFT Collector based out of NYC/Miami.
                Been dabbling in crypto since 2016. Once upon a time a corporate slave in private equity. 
                She realized she ain’t about that unbearable corporate life. So, she quit and started to gamble professionally (aka poker). 
                </Answer>
                </div>
               <p style={{paddingTop:"0px",marginBottom:"30px"}}>Follow BeepBeep on <a href="https://twitter.com/beepxbeepx">Twitter</a></p>

                <div style={{display:"flex" ,marginTop:"10px" }}>
                <img src={Peep} alt="Bamboo" style={{ width: `${isMobile ? `32%`: `15%`}`, height:`${isMobile ? `32%` :`15%`}` }} />
                <Answer  style={{marginBottom:"0px"}}>
                 <div> 
                <p>PandaPeep</p> <li>Artist / PPPandas co-founder</li>
                A Multidisciplinary Artist with a career in the Licensing & Merchandising industry.
                She was happily living her life doodling away in the studio, until BeepBeep roped her into the NFT space. 
                Gave birth to PPPandas after a laborious journey. About to go into labour with PPPals.
                </div>
                </Answer>
                </div>
                <p style={{paddingTop:"0px",marginBottom:"30px"}}>Follow PandaPeep on <a href="https://twitter.com/PppPeep">Twitter</a></p>
                
              </AnswerWrap>
            </AccordionItemWrap>

            <AccordionItemWrap>
              <h2>
                <AccordionButton>
                  <QuestionWrap flex="1" textAlign="left">
                    WHEN WILL THESE DROP?
                  </QuestionWrap>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AnswerWrap pb={4}>
                <img src={Bamboo} alt="Bamboo" style={{ width: "4%" }} />
                PPPandas were launched on 16th September 2021. They are sold out now but you can buy them from <a href="https://opensea.io/collection/thepppandas">OpenSea</a> 
              </AnswerWrap>
            </AccordionItemWrap>

            <AccordionItemWrap>
              <h2>
                <AccordionButton>
                  <QuestionWrap flex="1" textAlign="left">
                    DO I GET COMMERCIAL RIGHTS?
                  </QuestionWrap>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AnswerWrap pb={4}>
                <img src={Bamboo} alt="Bamboo" style={{ width: "4%" }} />
                You have complete and total ownership of your PPPandas. You have the right to create and distribute
                derivatives of your Panda under a non-exclusive license.
              </AnswerWrap>
            </AccordionItemWrap>

            <AccordionItemWrap>
              <h2>
                <AccordionButton>
                  <QuestionWrap flex="1" textAlign="left">
                    WHAT IS THE MINTING PRICE?
                  </QuestionWrap>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AnswerWrap pb={4}>
                <img src={Bamboo} alt="Bamboo" style={{ width: "4%" }} />
                PPPandas will cost 0.02 ETH + gas each to mint.
              </AnswerWrap>
            </AccordionItemWrap>

            <AccordionItemWrap>
              <h2>
                <AccordionButton>
                  <QuestionWrap flex="1" textAlign="left">
                  HOW DO I MINT PPPANDAS?
                  </QuestionWrap>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AnswerWrap pb={4}>
                <img src={Bamboo} alt="Bamboo" style={{ width: "4%" }} />
                <Answer>
                  1) Download the metamask.io extension for the Chrome/Brave browser or app on mobile. This will allow
                  you to make purchases with Ethereum and can be found in the extensions tab. If you are on mobile, you
                  must use the Metamask App Browser.
                </Answer>
                <Answer>
                  2) You can purchase Ethereum through the Metamask Wallet using Wyre or Send Ethereum from an exchange
                  like Coinbase.
                </Answer>
                <Answer>
                  3) Click on Connect at the top of the page and connect your Metamask. Once joined, you will be able to
                  purchase the NFTs in the mint section. You will be prompted to sign your transaction. FYI, there will
                  be a fee associated with every transaction related to gas prices.
                </Answer>
                <Answer>
                  4) Once you have made your purchase, your PPPanda NFTs will be viewable in your wallet and on OpenSea.
                </Answer>
              </AnswerWrap>
            </AccordionItemWrap>

            

            {/* <AccordionItemWrap>
              <h2>
                <AccordionButton>
                  <QuestionWrap flex="1" textAlign="left">
                    TOKENOMICS
                  </QuestionWrap>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AnswerWrap pb={4}>
                <img src={Bamboo} alt="Bamboo" style={{ width: "4%" }} />
                We have reserved 88 PPPandas to give away in contests and community activities. Each of our team members
                have also been given one PPPanda and the remainder will be up for sale during the launch.
              </AnswerWrap>
            </AccordionItemWrap> */}
 
            <AccordionItemWrap>
              {/* <h2>
                <AccordionButton>
                   <QuestionWrap flex="1" textAlign="left">
                  PPPANDAS SOCIAL MEDIA
                  </QuestionWrap>  
                  <AccordionIcon />
                </AccordionButton>                                                        
              </h2> */}
              <AnswerWrap pb={4}>
                
               
              </AnswerWrap>
            </AccordionItemWrap>
            <div style={{display:"flex"}}>
                <h1 className='footer-text'> FOLLOW  PPPANDAS ! </h1>
                {/* <div className='footer-icons'> */}
                  <a href="https://twitter.com/PPPandasNFT">
                    <img src={Twitter} alt="Bamboo" className='twitterimg' />
                  </a>
                  <a href="https://discord.com/invite/pppandas ">
                    <img src={Discord} alt="Bamboo" className='discordimg'/>
                  </a>
                  <a href="https://www.instagram.com/pppandas.ppp/">
                    <img src={Instagram} alt="Bamboo" className='instaimg' />

                  </a>
                  <a href=" https://www.tiktok.com/@pppandas.ppp">
                    <img src={Tiktok} alt="Bamboo"  className='tiktokimg'/>

                  </a>
                  </div>
              {/* </div>   */}
          </Accordion>
        </FAQWrap>
      </SectionWrap>
    </div>
  );
}
