import React from "react";
import { Button } from "antd";

export default function MintSection({tx}) {
  return (
    <div style={{ width: 640, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
      <div style={{ padding: 32 }}>
        <Button
          onClick={async () => {
            console.log("MINT Gold Ticket!");
            tx
            tx(writeContracts.SuperFuzzGoldTicket.claimTicket());
          }}
        >
          Mint
        </Button>
      </div>
    </div>
  );
}
