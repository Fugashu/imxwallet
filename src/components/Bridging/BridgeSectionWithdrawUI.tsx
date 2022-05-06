import React, { useState } from "react";
import { ImmutableAssetStatus, ImmutableXClient, Link } from "@imtbl/imx-sdk";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
interface BridgeSectionWithdrawalStatusInterface {
  imxLink: Link;
  walletAddress: string;
  apiClient: ImmutableXClient;
}
const BridgeSectionWithdrawUI = (
  props: BridgeSectionWithdrawalStatusInterface
) => {
  const inventoryEndpoint = "https://api.x.immutable.com/v1/assets?";
  const inventoryEndpointRopsten =
    "https://api.ropsten.x.immutable.com/v1/assets?";
  const [collectionAddress, setCollectionAddress] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [collectionImage, setCollectionImage] = useState("");

  const [inventory, setInventory] = useState([]);

  async function fetchInventory() {
    // let assetsRequest = await props.apiClient.getAssets({
    //   user: props.walletAddress,
    //   cursor: "1",
    //   status: networkLifespace,
    //   collection: collectionAddress,
    // });
    // console.log(assetsRequest);
    const result = await axios(
      inventoryEndpointRopsten +
        "collection=" +
        collectionAddress +
        "&user=" +
        props.walletAddress +
        "&status=" +
        "imx"
    );
    console.log(result.data.result);
    const nftArray = result.data.result;
    setCollectionName(nftArray[0]["collection"]["name"]);
    setCollectionImage(nftArray[0]["collection"]["icon_url"]);

    setInventory(nftArray);
  }
  return (
    <div className="deposit-withdraw-section">
      <div>
        <h1>Collection:</h1>
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
              onClick={fetchInventory}
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
        <h1>Your NFTs:</h1>

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
                <Button size="small" variant="contained" component="label">
                  Prepare NFT Withdrawal
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BridgeSectionWithdrawUI;
