import React, { useState } from "react";
import {
  ERC721TokenType,
  ETHTokenType,
  ImmutableXClient,
  Link,
} from "@imtbl/imx-sdk";
import Button from "@mui/material/Button";

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
    <div>
      <div>
        ETH:
        <br />
        <br />
        <br />
        <br />
        <div>
          Prepare ETH for withdrawal (submit to be rolled up and confirmed on
          chain in the next batch):
          <br />
          <label>
            Amount (ETH):
            <input
              type="text"
              value={prepareAmount}
              onChange={(e) => setPrepareAmount(e.target.value)}
            />
          </label>
          <Button
            variant="contained"
            component="label"
            size="small"
            onClick={prepareWithdrawalETH}
          >
            Prepare ETH Withdrawal
          </Button>
        </div>
        <br />
        <br />
        <div>
          Complete ETH withdrawal (withdraws entire eth balance that is ready
          for withdrawal to L1 wallet):
          <br />
          <Button
            variant="contained"
            component="label"
            size="small"
            onClick={completeWithdrawalETH}
          >
            Complete ETH Withdrawal
          </Button>
        </div>
      </div>
      <br />
      <div>
        ERC721:
        <br />
        <br />
        <br />
        <br />
        <div>
          Prepare NFT for withdrawal (submit to be rolled up and confirmed on
          chain in the next batch):
          <br />
          <label>
            Token ID:
            <input
              type="text"
              value={prepareTokenId}
              onChange={(e) => setPrepareTokenId(e.target.value)}
            />
          </label>
          <label>
            Token Address:
            <input
              type="text"
              value={prepareTokenAddress}
              onChange={(e) => setPrepareTokenAddress(e.target.value)}
            />
          </label>
          <Button
            variant="contained"
            component="label"
            size="small"
            onClick={prepareWithdrawalNFT}
          >
            Prepare NFT Withdrawal
          </Button>
        </div>
        <br />
        <br />
        <div>
          Complete NFT withdrawal (withdraws single NFT that is ready for
          withdrawal to L1 wallet):
          <br />
          <label>
            Token ID:
            <input
              type="text"
              value={completeTokenId}
              onChange={(e) => setCompleteTokenId(e.target.value)}
            />
          </label>
          <label>
            Token Address:
            <input
              type="text"
              value={completeTokenAddress}
              onChange={(e) => setCompleteTokenAddress(e.target.value)}
            />
          </label>
          <Button
            variant="contained"
            component="label"
            size="small"
            onClick={completeWithdrawalNFT}
          >
            Complete NFT Withdrawal
          </Button>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default BridgeSectionWithdraw;
