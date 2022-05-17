import React, { useState } from "react";
import {
  ERC721TokenType,
  ETHTokenType,
  ImmutableXClient,
  Link,
} from "@imtbl/imx-sdk";
import { Button, TextField } from "@mui/material";
import "./styles.css";
import axios from "axios";
import { ropstenInventoryEndpoint } from "../constants";
interface BridgeSectionDepositInterface {
  imxLink: Link;
  walletAddress: string;
  apiClient: ImmutableXClient;
}

const BridgeSectionDeposit = (props: BridgeSectionDepositInterface) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [collectionImage, setCollectionImage] = useState("");
  const [inventory, setInventory] = useState([]);

  async function depositNoParams() {
    try {
      // @ts-ignore
      await props.imxLink.deposit();
    } catch (e) {
      console.log(`Error while depositing:${e}`);
    }
  }

  // deposit an NFT
  async function depositNFT(tokenId: string) {
    try {
      await props.imxLink.deposit({
        type: ERC721TokenType.ERC721,
        tokenId: tokenId,
        tokenAddress: collectionAddress,
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
  async function fetchInventoryETH() {
    await axios(
      ropstenInventoryEndpoint +
        "collection=" +
        collectionAddress +
        "&user=" +
        props.walletAddress +
        "&status=" +
        "eth"
    )
      .catch((reason) => {
        alert("Collection was not found");
      })
      .then((value) => {
        console.log(value?.data.result);
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
      });
  }

  return (
    <div className="deposit-withdraw-section">
      <div>
        <h1>Deposit ERC20:</h1>
        <div className="deposit-withdraw-wrapper">
          <div className="deposit-withdraw-group">
            <Button
              size="large"
              variant="contained"
              component="label"
              onClick={depositNoParams}
            >
              Deposit
            </Button>
          </div>
          {/*
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
          </div>*/}
        </div>
      </div>
      <div>
        <h1>Deposit NFT:</h1>
        <div className="deposit-withdraw-wrapper">
          <div className="deposit-withdraw-group">
            Collection address you want to withdraw/deposit NFTs:
            <TextField
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
              onClick={fetchInventoryETH}
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
                  onClick={() => depositNFT(item["token_id"])}
                >
                  Deposit
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BridgeSectionDeposit;
