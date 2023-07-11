import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import Logo from "../assets/gold-ticket/superfuzz-logo.png";

const Wrap = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgWarp = styled.img`
  grid-column: 2;
`;

export default function Header() {
  return (
    <Wrap>
      Logo
    </Wrap>
  );
}
