import React from "react";
import styled, { css } from "styled-components";
import { DownloadOutlined } from "@ant-design/icons";
import RmIcon1 from "../assets/imgs/roadmap-panda-1.png";
import RmIcon2 from "../assets/imgs/roadmap-panda-2.png";
import RmIcon3 from "../assets/imgs/roadmap-panda-3.png";
import RmIcon4 from "../assets/imgs/roadmap-panda-4.png";
import RmIcon5 from "../assets/imgs/roadmap-panda-5.png";
import RmIcon6 from "../assets/imgs/roadmap-panda-6.png";
import RmIcon7 from "../assets/imgs/roadmap-panda-7.png";
import roadMapImg from "../assets/imgs/newroadmap.jpeg";
import checkmark from "../assets/imgs/checkmark-48.png";

const Wrap = styled.div`
  padding: 3vw;
  background: #bdffac;
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

const StageWrap = styled.div`
  @media (max-width: 765px) {
    width: 60%;
    margin: 0 auto;
  }
`;

const Stage = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  align-items: center;
  justify-items: center;
  margin-bottom: 3vw;
  ${props =>
    props.flip &&
    css`
      grid-template-columns: 90% 10%;
    `}
  @media (max-width: 765px) {
    grid-template-columns: 1fr;
  }
`;

// const NumberWrap = styled.div`
//   border: solid black 4px;
//   background: white;
//   color: black;
//   font-size: 1vw;
//   border-radius: 100%;
//   padding: 0.5vw;
//   @media (max-width: 765px) {
//     display: none;
//   }
// `;
const TextWithIcon = styled.div`
  display: grid;
  align-items: center;
  justify-items: start;
  grid-template-columns: 80% 20%;
  width: 100%;
  @media (max-width: 765px) {
    grid-template-columns: 1fr;
    justify-items: start;
    width: 100%;
  }
  ${props =>
    props.left &&
    css`
      grid-template-columns: 20% 80%;
      justify-items: end;
    `}
`;
const Icon = styled.img`
  width: 50%;
  transform: rotate(90deg);
  @media (max-width: 765px) {
    transform: rotate(0);
    margin: 2rem auto;
  }
  ${props =>
    props.left &&
    css`
      transform: rotate(-90deg);
    `}
  ${props =>
    props.notMobile &&
    css`
      display: none;
      @media (max-width: 765px) {
        display: block;
      }
    `}
  ${props =>
    props.hide &&
    css`
      display: block;
      @media (max-width: 765px) {
        display: none;
      }
    `}
`;
const Card = styled.div`
  background: white;
  padding: 1.5vw 3vw;
  border: solid black 7px;
  border-radius: 20px;
  text-align: right;
  margin-right: 0.1vw;
  width: 100%;
  @media (max-width: 765px) {
    text-align: left;
    width: 100%;
    padding: 2rem;
  }
  ${props =>
    props.left &&
    css`
      text-align: left;
    `}
`;
const CardHeading = styled.h2`
  font-weight: 500;
  font-size: 2vw;
  margin-bottom: 1rem;
  margin-top: 10px;
  @media (max-width: 765px) {
    font-size: 4vw;
    margin-top: 20px;
  }
`;

const CardBody = styled.div`
  font-size: 16px;
  color: #000;
`;

const RoadmapWrap = styled.div`
  text-align: center;
  margin-top: 2vw;
  margin-bottom: 2vw;
`;

const DownloadLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5vw;
  @media (max-width: 756px) {
    font-size: 4vw;
  }
`;

const RoadmapLi = styled.li``;

// const RoadmapList = styled.ul``;

const RoadmapCircle = styled.div`
  background: black;
  width: 10px;
  height: 10px;
  border-radius: 100%;
`;

// display: flex;
// align-items: center;

const Checkmark = styled.img`
  width: 25px;
  height: 25px;
  margin-top: 10px;
  margin-left: 10px;

  @media (max-width: 756px) {
    width: 7%;
    height: 7%;
    margin-top: 15px;
    margin-left: 15px;
  }
`;

export default function Roadmap() {
  return (
    <Wrap id="roadmap">
      <Heading>Roadmap</Heading>
      <StageWrap>
        {/* <Stage>
          <NumberWrap>01</NumberWrap>
          <TextWithIcon>
            <Card>
              <Icon notMobile src={RmIcon1} />
              <CardHeading>Aug 2021</CardHeading>
              <CardBody>
                <ul>
                  <RoadmapLi>Project Planning</RoadmapLi>
                  <RoadmapLi>Website Development</RoadmapLi>
                  <RoadmapLi>Artwork Development</RoadmapLi>
                </ul>
              </CardBody>
            </Card>
            <Icon hide src={RmIcon1} />
          </TextWithIcon>
        </Stage> */}

        <Stage flip>
          <TextWithIcon left>
            <Icon hide left src={RmIcon1} />
            <Card left>
              <Icon notMobile src={RmIcon1} />
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <CardHeading>Nov 2021</CardHeading>
                <Checkmark src={checkmark} />
              </div>
              <CardBody>
                <ul>
                  <RoadmapLi>Spooky Art Competition</RoadmapLi>
                  <RoadmapLi>PPPandas Poker Tournament</RoadmapLi>
                  <RoadmapLi>Trivia Sessions</RoadmapLi>
                  <RoadmapLi>Launch of PPPoints system & rewards</RoadmapLi>
                  <RoadmapLi>PPPandas weekly Among Us</RoadmapLi>
                </ul>
              </CardBody>
            </Card>
          </TextWithIcon>
        </Stage>

        <Stage flip>
          <TextWithIcon left>
            <Icon hide left src={RmIcon2} />
            <Card left>
              <Icon notMobile src={RmIcon2} />
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <CardHeading>Dec 2021</CardHeading>
                <Checkmark src={checkmark} />
              </div>
              <CardBody>
                <ul>
                  <RoadmapLi>Sneak Peeps & activities for upcoming PPPals</RoadmapLi>
                  <RoadmapLi>PPPals identity reveal</RoadmapLi>
                  <RoadmapLi>PPPeep live drawing sessions</RoadmapLi>
                  <RoadmapLi>Merch design & development</RoadmapLi>
                </ul>
              </CardBody>
            </Card>
          </TextWithIcon>
          {/* <NumberWrap>02</NumberWrap> */}
        </Stage>
        {/* <Stage>
          <NumberWrap>03</NumberWrap>
          <TextWithIcon>
            <Card>
              <Icon notMobile src={RmIcon3} />
              <CardHeading>Oct 2021</CardHeading>
              <CardBody>
                <ul>
                  <RoadmapLi>Listing On Rarity Tools</RoadmapLi>
                  <RoadmapLi>PPPandas meme contest</RoadmapLi>
                  <RoadmapLi>Exclusive giveaways & contest for PPPandas holders</RoadmapLi>
                  <RoadmapLi>Legendary 1/1 Palien giveaway</RoadmapLi>
                  <RoadmapLi>Planning & development of PPPal NFT, playmate for PPPandas NFT</RoadmapLi>
                </ul>
              </CardBody>
            </Card>
            <Icon hide src={RmIcon3} />
          </TextWithIcon>
        </Stage> */}

        <Stage flip>
          <TextWithIcon left>
            <Icon hide left src={RmIcon3} />
            <Card left>
              <Icon notMobile src={RmIcon3} />
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <CardHeading>Jan 2022</CardHeading>
                <Checkmark src={checkmark} />
              </div>
              <CardBody>
                <ul>
                  <RoadmapLi>$BAMBOO launch</RoadmapLi>
                  <RoadmapLi>PPPals mint launch</RoadmapLi>
                  <RoadmapLi>PPPals giveaways</RoadmapLi>
                  <RoadmapLi>Merchandise sneak peaks & Giveaways</RoadmapLi>
                </ul>
              </CardBody>
            </Card>
          </TextWithIcon>
        </Stage>

        <Stage flip>
          <TextWithIcon left>
            <Icon hide left src={RmIcon4} />
            <Card left>
              <Icon notMobile src={RmIcon4} />
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <CardHeading>Feb 2022</CardHeading>
                <Checkmark src={checkmark} />
              </div>
              <CardBody>
                <ul>
                  <RoadmapLi>Formation of PANDAO and funding of community wallet</RoadmapLi>
                  <RoadmapLi>Crossover PPPoker Tournament</RoadmapLi>
                  <RoadmapLi>Family-friendly competitions</RoadmapLi>
                  <RoadmapLi>Exclusive PPPandas merchandise development</RoadmapLi>
                </ul>
              </CardBody>
            </Card>
          </TextWithIcon>
          {/* <NumberWrap>04</NumberWrap> */}
        </Stage>
        <Stage flip>
          <TextWithIcon left>
            <Icon hide left src={RmIcon3} />
            <Card left>
              <Icon notMobile src={RmIcon3} />
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <CardHeading>March 2022</CardHeading>
                <Checkmark src={checkmark} />
              </div>

              <CardBody>
                <ul>
                  <RoadmapLi>Developing Family-friendly branding & partnerships</RoadmapLi>
                  <RoadmapLi>BAMBOO SHOP preparation</RoadmapLi>
                  <RoadmapLi>Holders meetup and merchandise giveaway at NFT LA</RoadmapLi>
                </ul>
              </CardBody>
            </Card>
          </TextWithIcon>
        </Stage>

        <Stage flip>
          <TextWithIcon left>
            <Icon hide left src={RmIcon2} />
            <Card left>
              <Icon notMobile src={RmIcon2} />
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <CardHeading>Q3 2022</CardHeading>
                {/* <Checkmark src={checkmark} /> */}
              </div>
              <CardBody>
                <ul>
                  <RoadmapLi>Conceptualizing & planning of PPPandas first IRL event</RoadmapLi>
                  <RoadmapLi>Launch of inter-community Sketchful & PPPoker tourney</RoadmapLi>
                  <RoadmapLi>Holders meetup and merchandise giveaway at upcoming NFT NYC</RoadmapLi>
                  <RoadmapLi>Bamboo Shop launch</RoadmapLi>
                  <RoadmapLi>New PPPandas merchandise releases</RoadmapLi>
                </ul>
              </CardBody>
            </Card>
          </TextWithIcon>
          {/* <NumberWrap>02</NumberWrap> */}
        </Stage>
        {/* <Stage>
          <NumberWrap>05</NumberWrap>
          <TextWithIcon>
            <Card>
              <Icon notMobile src={RmIcon5} />
              <CardHeading>Dec 2021</CardHeading>
              <CardBody>
                <ul>
                  <RoadmapLi>Sneak peeks & contests from upcoming PPPal launch</RoadmapLi>
                  <RoadmapLi>PPPal identity reveal & pre-launch</RoadmapLi>
                  <RoadmapLi>$PPP tokens can be used to mint future playmate PPPal</RoadmapLi>
                </ul>
              </CardBody>
            </Card>
            <Icon hide src={RmIcon5} />
          </TextWithIcon>
        </Stage> */}

        {/*<Stage flip>
          <TextWithIcon left>
            <Icon hide left src={RmIcon5} />
            <Card left>
              <Icon notMobile src={RmIcon5} />
              <CardHeading>Dec 2021</CardHeading>
              <CardBody>
                <ul>
                  <RoadmapLi>Sneak peeks & contests from upcoming PPPal launch</RoadmapLi>
                  <RoadmapLi>PPPal identity reveal & pre-launch</RoadmapLi>
                  <RoadmapLi>PPPanda holders will be able to claim PPPals (details TBC)</RoadmapLi>
                </ul>
              </CardBody>
            </Card>
          </TextWithIcon>
        </Stage>

        <Stage flip>
          <TextWithIcon left>
            <Icon hide left src={RmIcon6} />
            <Card left>
              <Icon notMobile src={RmIcon6} />
              <CardHeading>Jan 2022</CardHeading>
              <CardBody>
                <ul>
                  <RoadmapLi>BAMBOO SHOP launch preparation</RoadmapLi>
                  <RoadmapLi>Breeding of baby PPPals</RoadmapLi>
                  <RoadmapLi>PPPandas physical merchandise sneak peeks & giveaway contest</RoadmapLi>
                </ul>
              </CardBody>
            </Card>
          </TextWithIcon>
          {/* <NumberWrap>06</NumberWrap> }
        </Stage>
        {/* <Stage>
          <NumberWrap>07</NumberWrap>
          <TextWithIcon>
            <Card>
              <Icon notMobile src={RmIcon7} />
              <CardHeading>Feb 2022</CardHeading>
              <CardBody>
                <ul>
                  <RoadmapLi>PPP Merch store launch</RoadmapLi>
                  <RoadmapLi>Merchandise can be purchased using $PPP tokens</RoadmapLi>
                </ul>
              </CardBody>
            </Card>
            <Icon hide src={RmIcon7} />
          </TextWithIcon>
        </Stage>}

        <Stage flip>
          <TextWithIcon left>
            <Icon hide left src={RmIcon7} />
            <Card left>
              <Icon notMobile src={RmIcon7} />
              <CardHeading>Feb 2022</CardHeading>
              <CardBody>
                <ul>
                  <RoadmapLi>BAMBOO SHOP launch</RoadmapLi>
                  <RoadmapLi>Exclusive PPPandas merchandise available</RoadmapLi>
                </ul>
              </CardBody>
            </Card>
          </TextWithIcon>
        </Stage>*/}
      </StageWrap>
      {/* eslint-disable-next-line camelcase */}
      <RoadmapWrap>
        <DownloadLink href={roadMapImg}>
          <DownloadOutlined style={{ marginRight: "1rem" }} />
          Download the Roadmap Artwork (You get to count PPPandas!)
        </DownloadLink>
      </RoadmapWrap>
    </Wrap>
  );
}
