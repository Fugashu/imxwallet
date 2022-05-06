import React, { useEffect, useState } from "react";
import {
  ERC721TokenType,
  ImmutableMethodResults,
  ImmutableRollupStatus,
  ImmutableXClient,
  Link,
} from "@imtbl/imx-sdk";
import Button from "@mui/material/Button";
import "./styles.css";
import axios from "axios";
import {
  ropstenApiAddress,
  ropstenInventoryEndpoint,
  ropstenWithdrawalEndpoint,
} from "../constants";

interface BridgeSectionWithdrawalStatusInterface {
  imxLink: Link;
  walletAddress: string;
  apiClient: ImmutableXClient;
}
const BridgeSectionWithdrawalStatus = (
  props: BridgeSectionWithdrawalStatusInterface
) => {
  const [readyToWithdrawInventory, setReadToWithdrawInventory] = useState([]);
  const [preparationInventory, setPreparationInventory] = useState([]);

  async function loadWithdrawals() {
    let result = await axios(
      ropstenWithdrawalEndpoint +
        "withdrawn_to_wallet=" +
        false +
        "&user=" +
        props.walletAddress +
        "&rollup_status=" +
        "confirmed"
    );

    console.log(result.data.result);
    let res = result.data.result;

    //todo hier wieter machen
    res["imgurl"] = 4;

    await res.map(
      async (item: { [x: string]: { [x: string]: { [x: string]: string } } }) =>
        console.log(
          await getImageForItem(
            item["token"]["data"]["token_address"],
            item["token"]["data"]["token_id"]
          )
        )
    );

    setReadToWithdrawInventory(res);

    result = await axios(
      ropstenWithdrawalEndpoint +
        "withdrawn_to_wallet=" +
        false +
        "&user=" +
        props.walletAddress +
        "&rollup_status=" +
        "included"
    );

    console.log(result.data.result);
    res = result.data.result;
    setPreparationInventory(res);
  }

  async function getImageForItem(tokenAddress: string, tokenId: string) {
    let query = ropstenApiAddress + "/assets/" + tokenAddress + "/" + tokenId;
    let result = await axios(query);
    return result.data.image_url;
  }
  // complete an NFT withdrawal
  async function completeWithdrawalNFT(tokenId: string, tokenAddress: string) {
    try {
      await props.imxLink.completeWithdrawal({
        type: ERC721TokenType.ERC721,
        tokenId: tokenId,
        tokenAddress: tokenAddress,
      });
    } catch (e) {
      console.log(`Error while completing NFT withdrawal:${e}`);
    }
  }

  return (
    <div>
      <div className="deposit-withdraw-section">
        <h1>Withdrawal Status:</h1>
        <Button
          size="large"
          variant="contained"
          component="label"
          onClick={loadWithdrawals}
        >
          Reload Withdrawals
        </Button>

        <div className="deposit-withdraw-section">
          {preparationInventory.length !== 0 ? (
            <div>
              <h1>Withdrawals being prepared:</h1>
              <div className="deposit-withdraw-wrapper">
                <div className="inventory-wrapper">
                  {preparationInventory.map((item) => (
                    <div
                      key={item["token"]["data"]["token_id"]}
                      className="inventory-item"
                    >
                      <img
                        style={{ width: "250px", height: "auto" }}
                        src={""}
                        alt={""}
                      />

                      <p>
                        Token ID:
                        {item["token"]["data"]["token_id"]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {readyToWithdrawInventory.length !== 0 ? (
            <div>
              <h1>Complete NFT Withdrawal:</h1>

              <div className="deposit-withdraw-wrapper">
                <div className="inventory-wrapper">
                  {readyToWithdrawInventory.map((item) => (
                    <div
                      key={item["token"]["data"]["token_id"]}
                      className="inventory-item"
                    >
                      <img
                        style={{ width: "250px", height: "auto" }}
                        src={""}
                        alt={""}
                      />

                      <p>
                        Token ID:
                        {item["token"]["data"]["token_id"]}
                      </p>
                      <Button
                        size="small"
                        variant="contained"
                        component="label"
                        onClick={() =>
                          completeWithdrawalNFT(
                            item["token"]["data"]["token_id"],

                            item["token"]["data"]["token_address"]
                          )
                        }
                      >
                        Complete Withdrawal
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BridgeSectionWithdrawalStatus;
