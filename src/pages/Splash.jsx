import React from "react";
import styled from "styled-components";
import BigLogo from "../assets/imgs/Website-first-section-PNG.png";
import Discord from "../assets/imgs/01.png";
import "./Splash.css";
import Instagram from "../assets/imgs/03.png";
// import Instagram from "../assets/imgs/ig-icon.png";
import Twitter from "../assets/imgs/02.png";
import Mintable from "../assets/imgs/05.png";
import OpenSea from "../assets/imgs/06.png";
import Tiktok from "../assets/imgs/04.png";

const HeroBG = styled.div`
  background: rgb(252, 255, 165);
  padding: 4rem 0 0 0;
  @media (max-width: 756px) {
    height: auto;
    padding: 11vw 0;
  }
`;

const NavMenu = styled.nav`
  padding: 2rem;
`;

const NavMenuWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: white;
  width: 55%;
  margin: auto;
  padding: 1vw;
  border-radius: 20px;
  @media (max-width: 756px) {
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

const NavItemClaim = styled.a`
  font-size: 1.2vw;
  color: black;
  @media (max-width: 756px) {
    font-size: 3vw;
    margin: 2vw;
  }
`;

const BigLogoWrap = styled.div`
  position: relative;
`;
const BigLogoImg = styled.img`
  width: 100%;
  margin: 0 auto;
`;

const GreenButton = styled.button`
  background: #00d487;
  width: 100%;
  max-width: 207px;
  color: white;
  padding: 0.6vw;
  border: solid 3px green;
  text-transform: uppercase !important;
  border-radius: 30px;
  margin: 10 auto;
  font-size: 1.2vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (min-width: 320px) and (max-width: 376px) {
    font-size: 3vw;
    background: red;
    width: 100px;
    margin: 2vw;
  }
`;
const GreenBtnWrap = styled.div`
    position: absolute;
    display: flex;
    margin-bottom:75px
    padding:10px
    align-items: center;
    justify-content: center;
    text-align:center;
    
    top: 86%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    display: grid;
`;

const DiscordImg = styled.img``;
const TwitterImg = styled.img``;
const InstagramImg = styled.img``;
const OpenSeaImg = styled.img`
height:30px;
width:50px;
`;
const MintableImg = styled.img`
height:20px

`;

export default function Splash() {
  return (
    <HeroBG id="home">
      <NavMenu>
        <NavMenuWrap>
          <NavItem href="/">Home</NavItem>
          <NavItem href="/#mint">Mint Pandas</NavItem>
          <NavItem href="/mint-pppals">Mint Pals</NavItem>
          <NavItem href="/#rarity">Rarity</NavItem>
          <NavItem href="/#roadmap">Roadmap</NavItem>
          <NavItem href="/#faq">FAQs</NavItem>
          <NavItem href="/claim">Claim </NavItem>
          <NavItem href="https://shop.pppandas.com/">Shop</NavItem>
        </NavMenuWrap>
      </NavMenu>
      <BigLogoWrap>
        <div className='GreenBtnWrap' style={{ display: 'flex', marginTop: '65px' }}>
          <button className='btn-discord' onClick={() => window.open("https://discord.gg/PPPandas")} >
            <DiscordImg src={Discord} className='imgdiscord' />
          </button>
          <button className='btn-twitter' onClick={() => window.open("https://twitter.com/PPPandasNFT")} >

            <TwitterImg src={Twitter} className='imgtwitter' />
          </button>
          <button className='btn-instagram' onClick={() => window.open("https://www.instagram.com/pppandas.ppp/")} >

            <InstagramImg className='imginsta' src={Instagram} />
          </button>

          <button className='btn-tiktok' onClick={() => window.open(" https://www.tiktok.com/@pppandas.ppp")} >

            <TwitterImg className='imgtiktok' src={Tiktok} />
          </button>

          <button className='btn-opensea' onClick={() => window.open("https://opensea.io/collection/thepppandas")}>

            <OpenSeaImg className='imgopensea' src={OpenSea} />
          </button>
          <button className='btn-mintable' onClick={() => window.open("https://mintable.app/store/PPPandas-PPPandas/0xa440467f6d5fbd62f6eef01192caa52850aa1d5f")} >

            <MintableImg className='imgmintable' src={Mintable} />
          </button>
        </div>

        <BigLogoImg style={{ paddingTop: '-100px' }} src={BigLogo} />




      </BigLogoWrap>
    </HeroBG>
  );
}
