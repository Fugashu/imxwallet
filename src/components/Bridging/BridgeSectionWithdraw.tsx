import React, { useState } from "react";
import {
  ERC721TokenType,
  ETHTokenType,
  ImmutableXClient,
  Link,
} from "@imtbl/imx-sdk";
import Button from "@mui/material/Button";
import "./styles.css";
import TextField from "@mui/material/TextField";

interface BridgeSectionWithdrawInterface {
  imxLink: Link;
  walletAddress: string;
  apiClient: ImmutableXClient;
}
const BridgeSectionWithdraw = (props: BridgeSectionWithdrawInterface) => {
  // eth
  const [prepareAmount, setPrepareAmount] = useState("");

  // nft

  const [prepareTokenId, setPrepareTokenId] = useState("");
  const [prepareTokenAddress, setPrepareTokenAddress] = useState("");
  const [completeTokenId, setCompleteTokenId] = useState("");
  const [completeTokenAddress, setCompleteTokenAddress] = useState("");

  // prepare an NFT withdrawal
  async function prepareWithdrawalNFT() {
    try {
      await props.imxLink.prepareWithdrawal({
        type: ERC721TokenType.ERC721,
        tokenId: prepareTokenId,
        tokenAddress: prepareTokenAddress,
      });
    } catch (e) {
      console.log(`Error while preparing NFT withdrawal:${e}`);
    }
  }

  // prepare an eth withdrawal
  async function prepareWithdrawalETH() {
    try {
      await props.imxLink.prepareWithdrawal({
        type: ETHTokenType.ETH,
        amount: prepareAmount,
      });
    } catch (e) {
      console.log(`Error while preparing ETH withdrawal:${e}`);
    }
  }

  // complete an NFT withdrawal
  async function completeWithdrawalNFT() {
    try {
      await props.imxLink.completeWithdrawal({
        type: ERC721TokenType.ERC721,
        tokenId: completeTokenId,
        tokenAddress: completeTokenAddress,
      });
    } catch (e) {
      console.log(`Error while completing NFT withdrawal:${e}`);
    }
  }

  // complete an eth withdrawal
  async function completeWithdrawalETH() {
    try {
      await props.imxLink.completeWithdrawal({
        type: ETHTokenType.ETH,
      });
    } catch (e) {
      console.log(`Error while completing ETH withdrawal:${e}`);
    }
  }
  return (
    <div className="deposit-withdraw-section">
      <div>
        <h1>Withdraw ETH:</h1>
        <div className="deposit-withdraw-wrapper">
          <div className="deposit-withdraw-group">
            Prepare ETH for withdrawal:
            <TextField
              id="outlined-basic"
              label="Amount (ETH):"
              variant="outlined"
              value={prepareAmount}
              onChange={(e) => setPrepareAmount(e.target.value)}
            />
            <Button
              size="large"
              variant="contained"
              component="label"
              onClick={prepareWithdrawalETH}
            >
              Prepare ETH Withdrawal
            </Button>
          </div>

          <div className="deposit-withdraw-group">
            Complete ETH withdrawal:
            <Button
              size="large"
              variant="contained"
              component="label"
              onClick={completeWithdrawalETH}
            >
              Complete ETH Withdrawal
            </Button>
          </div>
        </div>
      </div>
      <div>
        <h1>Withdraw NFT:</h1>
        <div className="deposit-withdraw-wrapper">
          <div className="deposit-withdraw-group">
            Prepare NFT for withdrawal:
            <br />
            <TextField
              sx={{ borderColor: "red" }}
              id="outlined-basic"
              label="Token ID"
              variant="outlined"
              value={prepareTokenId}
              onChange={(e) => setPrepareTokenId(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Token Address"
              variant="outlined"
              value={prepareTokenAddress}
              onChange={(e) => setPrepareTokenAddress(e.target.value)}
            />
            <Button
              size="large"
              variant="contained"
              component="label"
              onClick={prepareWithdrawalNFT}
            >
              Prepare NFT Withdrawal
            </Button>
          </div>
          <div className="deposit-withdraw-group">
            Complete NFT withdrawal:
            <TextField
              id="outlined-basic"
              label="Token ID"
              variant="outlined"
              value={completeTokenId}
              onChange={(e) => setCompleteTokenId(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Token Address"
              variant="outlined"
              value={completeTokenAddress}
              onChange={(e) => setCompleteTokenAddress(e.target.value)}
            />
            <Button
              size="large"
              variant="contained"
              component="label"
              onClick={completeWithdrawalNFT}
            >
              Complete NFT Withdrawal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BridgeSectionWithdraw;
