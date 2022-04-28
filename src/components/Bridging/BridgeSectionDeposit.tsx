import React, { useState } from "react";
import {
  ERC721TokenType,
  ETHTokenType,
  ImmutableXClient,
  Link,
} from "@imtbl/imx-sdk";
import { Button, TextField } from "@mui/material";
import "./styles.css";
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
    <div className="deposit-withdraw-section">
      <h1>Deposit:</h1>
      <div className="deposit-withdraw-wrapper">
        <div className="deposit-withdraw-group">
          Deposit No Params:
          <Button
            size="large"
            variant="contained"
            component="label"
            onClick={depositNoParams}
          >
            Deposit
          </Button>
        </div>
        <div className="deposit-withdraw-group">
          Deposit ETH:
          <TextField
            id="outlined-basic"
            label="Amount (ETH):"
            variant="outlined"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
          <Button
            size="large"
            variant="contained"
            component="label"
            onClick={depositETH}
          >
            Deposit ETH
          </Button>
        </div>
        <div className="deposit-withdraw-group">
          Deposit NFT:
          <TextField
            id="outlined-basic"
            label="Token ID"
            variant="outlined"
            value={depositTokenId}
            onChange={(e) => setDepositTokenId(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Token Address"
            variant="outlined"
            value={depositTokenAddress}
            onChange={(e) => setDepositTokenAddress(e.target.value)}
          />
          <Button
            size="large"
            variant="contained"
            component="label"
            onClick={depositNFT}
          >
            Deposit NFT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BridgeSectionDeposit;
