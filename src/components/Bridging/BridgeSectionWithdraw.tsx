import React, { useState } from "react";
import {
  ERC20TokenType,
  ERC721TokenType,
  ETHTokenType,
  ImmutableXClient,
  Link,
} from "@imtbl/imx-sdk";
import Button from "@mui/material/Button";
import "./styles.css";
import TextField from "@mui/material/TextField";

import { callInventory, getSymbolForToken } from "./BackendCalls";

interface BridgeSectionWithdrawInterface {
  imxLink: Link;
  walletAddress: string;
  apiClient: ImmutableXClient;
  apiAddress: string;
}
const BridgeSectionWithdraw = (props: BridgeSectionWithdrawInterface) => {
  const [prepareETHAmount, setPrepareETHAmount] = useState("");
  const [prepareERC20Amount, setPrepareERC20Amount] = useState("");
  const [prepareERC20TokenAddr, setPrepareERC20TokenAddr] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [collectionImage, setCollectionImage] = useState("");
  const [inventory, setInventory] = useState([]);

  // not used
  /*
  async function reloadWithdrawals(): Promise<void> {
    // included in batch awaiting confirmation
    setReadyWithdrawals(
      await props.apiClient.getWithdrawals({
        user: props.walletAddress,
        rollup_status: ImmutableRollupStatus.confirmed,
        withdrawn_to_wallet: false,
      })
    ); // confirmed on-chain in a batch and ready to be withdrawn
    setCompletedWithdrawals(
      await props.apiClient.getWithdrawals({
        user: props.walletAddress,
        withdrawn_to_wallet: true,
      })
    ); // confirmed on-chain in a batch and already withdrawn to L1 wallet
  }

  const [readyWithdrawals, setReadyWithdrawals] =
    useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
  const [completedWithdrawals, setCompletedWithdrawals] =
    useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
*/

  // prepare an ERC721 withdrawal
  async function prepareWithdrawalNFT(tokenId: string) {
    try {
      await props.imxLink.prepareWithdrawal({
        type: ERC721TokenType.ERC721,
        tokenId: tokenId,
        tokenAddress: collectionAddress,
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
        amount: prepareETHAmount,
      });
    } catch (e) {
      console.log(`Error while preparing ETH withdrawal:${e}`);
    }
  }
  // prepare an ERC20 withdrawal
  async function prepareWithdrawalERC20() {
    const response = await props.imxLink.prepareWithdrawal({
      type: ERC20TokenType.ERC20,
      tokenAddress: prepareERC20TokenAddr,
      symbol: await getSymbolForToken(props.apiAddress, prepareERC20TokenAddr),
      amount: prepareERC20Amount,
    });

    console.log(response);
  }

  async function fetchInventoryIMX() {
    let value = await callInventory(
      props.apiAddress,
      collectionAddress,
      props.walletAddress,
      "imx"
    );
    const nftArray = value?.data.result;
    if (nftArray.length === 0) {
      alert(
        "The collection address was either wrong or you do not own IMX NFTs of this collection."
      );
      return;
    }
    setCollectionName(nftArray[0]["collection"]["name"]);
    setCollectionImage(nftArray[0]["collection"]["icon_url"]);
    setInventory(nftArray);
  }
  return (
    <div className="deposit-withdraw-section">
      <div>
        <h1>Prepare ETH & ERC20 Withdrawal:</h1>
        <div className="deposit-withdraw-wrapper">
          <div className="deposit-withdraw-group">
            Prepare ETH for withdrawal:
            <TextField
              id="outlined-basic"
              label="Amount (ETH):"
              variant="outlined"
              value={prepareETHAmount}
              onChange={(e) => setPrepareETHAmount(e.target.value)}
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
            Prepare ERC20 for withdrawal:
            <TextField
              id="outlined-basic"
              label="Amount:"
              variant="outlined"
              value={prepareERC20Amount}
              onChange={(e) => setPrepareERC20Amount(e.target.value)}
            />
            <TextField
              className="text-field"
              id="outlined-basic"
              label="Token Address:"
              variant="outlined"
              value={prepareERC20TokenAddr}
              onChange={(e) => setPrepareERC20TokenAddr(e.target.value)}
            />
            <Button
              size="large"
              variant="contained"
              component="label"
              onClick={prepareWithdrawalERC20}
            >
              Prepare ERC20 Withdrawal
            </Button>
          </div>
          {/*
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
          </div>*/}
        </div>
      </div>
      <div className="deposit-withdraw-section">
        <div>
          <h1>Prepare NFT Withdrawal:</h1>
          <div className="deposit-withdraw-wrapper">
            <div className="deposit-withdraw-group">
              Collection address you want to withdraw NFTs:
              <TextField
                className="text-field"
                id="outlined-basic"
                label="Collection Address:"
                variant="outlined"
                value={collectionAddress}
                onChange={(e) => setCollectionAddress(e.target.value)}
              />
              <Button
                size="large"
                variant="contained"
                component="label"
                onClick={fetchInventoryIMX}
              >
                Fetch Inventory
              </Button>
            </div>
            <div className="deposit-withdraw-group">
              {collectionImage ? (
                <div>
                  <img
                    alt="collection-img"
                    style={{ width: "200px", height: "auto" }}
                    src={collectionImage}
                  />
                  <p>{collectionName}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div>
          {collectionName ? <h1>Your NFTs from {collectionName}:</h1> : null}
          <div className="deposit-withdraw-wrapper">
            <div className="inventory-wrapper">
              {inventory.map((item) => (
                <div key={item["id"]} className="inventory-item">
                  <img
                    style={{ width: "250px", height: "auto" }}
                    src={item["image_url"]}
                    alt={item["image_url"]}
                  />
                  <p>Token ID: {item["token_id"]}</p>
                  <Button
                    size="small"
                    variant="contained"
                    component="label"
                    onClick={() => prepareWithdrawalNFT(item["token_id"])}
                  >
                    Prepare Withdrawal
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BridgeSectionWithdraw;
