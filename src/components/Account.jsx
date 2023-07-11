import React from "react";
import styled from "styled-components";
import Address from "./Address";
import Wallet from "./Wallet";

const ButtonWrap = styled.button`
  background: #00d486;
  color: white;
  width: 150px;
  height: 56px;
  border-radius: 10rem;
  font-size: 1.2vw;
  text-transform: uppercase !important;
  cursor: pointer !important;
  border: solid green 3px;
  @media (max-width: 768px) {
    font-size: 3vw;
  }
`;

const Wrap = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
`;

export default function Account({
  address,
  userSigner,
  localProvider,
  mainnetProvider,
  price,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
}) {
  const modalButtons = [];
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <ButtonWrap
          key="logoutbutton"
          style={{ verticalAlign: "top", marginLeft: 8, marginTop: 4 }}
          shape="round"
          size="large"
          onClick={logoutOfWeb3Modal}
        >
          Logout
        </ButtonWrap>,
      );
    } else {
      modalButtons.push(
        <ButtonWrap
          key="loginbutton"
          style={{ verticalAlign: "top", marginLeft: 8, marginTop: 4 }}
          shape="round"
          size="large"
          onClick={loadWeb3Modal}
        >
          Connect
        </ButtonWrap>,
      );
    }
  }

  const display = minimized ? (
    ""
  ) : (
    <span>
      {address && <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />}
      <Wallet
        address={address}
        provider={localProvider}
        signer={userSigner}
        ensProvider={mainnetProvider}
        price={price}
      />
    </span>
  );

  return (
    <Wrap>
      <div>{display}</div>
      <div>{modalButtons}</div>
    </Wrap>
  );
}
