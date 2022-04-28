import React, { useState } from "react";
import {
  ERC721TokenType,
  ETHTokenType,
  ImmutableXClient,
  Link,
} from "@imtbl/imx-sdk";
import { Button } from "@mui/material";
interface BridgeSectionDepositInterface {
  imxLink: Link;
  walletAddress: string;
  apiClient: ImmutableXClient;
}
const BridgeSectionDeposit = (props: BridgeSectionDepositInterface) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [depositTokenId, setDepositTokenId] = useState("");
  const [depositTokenAddress, setDepositTokenAddress] = useState("");

  async function depositNoParams() {
    try {
      // @ts-ignore
      await props.imxLink.deposit();
    } catch (e) {
      console.log(`Error while depositing:${e}`);
    }
  }

  // deposit an NFT
  async function depositNFT() {
    try {
      await props.imxLink.deposit({
        type: ERC721TokenType.ERC721,
        tokenId: depositTokenId,
        tokenAddress: depositTokenAddress,
      });
    } catch (e) {
      console.log(`Error while depositing NFT:${e}`);
    }
  }

  // deposit eth
  async function depositETH() {
    try {
      await props.imxLink.deposit({
        type: ETHTokenType.ETH,
        amount: depositAmount,
      });
    } catch (e) {
      console.log(`Error while depositing ETH:${e}`);
    }
  }

  return (
    <div>
      <div>
        Deposit No Params:
        <br />
        <Button
          variant="contained"
          component="label"
          size="small"
          onClick={depositNoParams}
        >
          Deposit
        </Button>
      </div>

      <div>
        Deposit ETH:
        <br />
        <label>
          Amount (ETH):
          <input
            type="text"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
        </label>
        <Button
          variant="contained"
          component="label"
          size="small"
          onClick={depositETH}
        >
          Deposit ETH
        </Button>
      </div>
      <div>
        Deposit NFT:
        <br />
        <label>
          Token ID:
          <input
            type="text"
            value={depositTokenId}
            onChange={(e) => setDepositTokenId(e.target.value)}
          />
        </label>
        <label>
          Token Address:
          <input
            type="text"
            value={depositTokenAddress}
            onChange={(e) => setDepositTokenAddress(e.target.value)}
          />
        </label>
        <Button
          variant="contained"
          component="label"
          size="small"
          onClick={depositNFT}
        >
          Deposit NFT
        </Button>
      </div>
    </div>
  );
};

export default BridgeSectionDeposit;
