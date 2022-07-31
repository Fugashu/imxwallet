import React, { useState } from "react";
import {
  ERC721TokenType,
  ETHTokenType,
  ImmutableXClient,
  Link,
} from "@imtbl/imx-sdk";
import { Button, TextField } from "@mui/material";
import "./styles.css";
import { callInventory } from "./BackendCalls";
interface BridgeSectionDepositInterface {
  imxLink: Link;
  walletAddress: string;
  apiClient: ImmutableXClient;
  apiAddress: string;
}

const BridgeSectionDeposit = (props: BridgeSectionDepositInterface) => {
  // eslint-disable-next-line
  const [depositAmount, setDepositAmount] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [collectionImage, setCollectionImage] = useState("");
  const [inventory, setInventory] = useState([]);

  // deposit ERC20s
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

  // deposit ETH
  // eslint-disable-next-line
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
  // retrieves Inventory on L1
  async function fetchInventoryETH() {
    let value = await callInventory(
      props.apiAddress,
      collectionAddress,
      props.walletAddress,
      "eth"
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
        <h1>Deposit ERC20:</h1>
        <div className="deposit-withdraw-wrapper">
          <div className="deposit-withdraw-group">
            <Button
              size="large"
              variant="contained"
              component="label"
              onClick={depositNoParams}
              sx={{ backgroundColor: "#0072F5" }}
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
            Collection address you want to deposit NFTs:
            <TextField
              className="text-field"
              id="outlined-basic"
              label="Collection Address:"
              variant="outlined"
              value={collectionAddress}
              sx={{
                "& label.Mui-focused": {
                  color: "#0072F5",
                },
                "& label.Mui-outlined": {
                  color: "#0072F5",
                },

                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "#0072F5",
                  },
                  "&:hover fieldset": {
                    borderColor: "#0072F5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0072F5",
                  },
                },
                "& .MuiInputBase-root": {
                  color: "#0072F5",
                },
                "& .MuiFormLabel-root": {
                  color: "#0072F5",
                },
              }}
              onChange={(e) => setCollectionAddress(e.target.value)}
            />
            <Button
              size="large"
              variant="contained"
              component="label"
              onClick={fetchInventoryETH}
              sx={{ backgroundColor: "#0072F5" }}
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
                  sx={{ backgroundColor: "#0072F5" }}
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
