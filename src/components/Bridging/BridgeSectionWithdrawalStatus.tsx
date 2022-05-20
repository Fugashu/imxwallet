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

import { ethers } from "ethers";
import {
  callCompletedWithdrawals,
  getImageForItem,
  getSymbolForToken,
} from "./BackendCalls";

interface BridgeSectionWithdrawalStatusInterface {
  imxLink: Link;
  walletAddress: string;
  apiClient: ImmutableXClient;
  apiAddress: string;
}
const BridgeSectionWithdrawalStatus = (
  props: BridgeSectionWithdrawalStatusInterface
) => {
  const [readyToWithdrawInventory, setReadyToWithdrawInventory] = useState([]);
  const [preparationInventory, setPreparationInventory] = useState([]);

  async function loadWithdrawals() {
    let result = await callCompletedWithdrawals(
      props.apiAddress,
      props.walletAddress,
      "confirmed"
    );

    console.log(result.data.result);
    let res = result.data.result;

    await res.map(async (item: any) => {
      let url = await getImageForItem(
        props.apiAddress,
        item["token"]["data"]["token_address"],
        item["token"]["data"]["token_id"]
      );

      return (item["imgUrl"] = url);
    });
    await res.map(async (item: any) => {
      let symbol = await getSymbolForToken(
        props.apiAddress,
        item["token"]["data"]["token_address"]
      );

      return (item["symbol"] = symbol ? symbol : "ETH");
    });

    // const erc721Tokens = res.filter(
    //   (element: any) => element["token"]["type"] === "ERC721"
    // );
    // const erc20Tokens = res.filter(
    //   (element: any) => element["token"]["type"] === "ERC20"
    // );
    console.log(res);
    setReadyToWithdrawInventory(res);

    result = await callCompletedWithdrawals(
      props.apiAddress,
      props.walletAddress,
      "included"
    );

    console.log(result.data.result);
    res = result.data.result;

    setPreparationInventory(res);
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
  // complete an Erc20 withdrawal
  async function completeWithdrawalErc20(symbol: string, tokenAddress: string) {
    console.log("trying to complete eth withdrawal ");
    if (tokenAddress === "") {
      try {
        await props.imxLink.completeWithdrawal({
          type: ETHTokenType.ETH,
        });
      } catch (e) {
        console.log(`Error while completing ERC20 withdrawal:${e}`);
      }
      return;
    }

    try {
      await props.imxLink.completeWithdrawal({
        symbol: "",
        tokenAddress: tokenAddress,
        type: ERC20TokenType.ERC20,
      });
    } catch (e) {
      console.log(`Error while completing ERC20 withdrawal:${e}`);
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
                      key={
                        item["token"]["data"]["token_address"] +
                        item["token"]["data"]["token_id"]
                      }
                      className="inventory-item"
                    >
                      <img
                        style={{ width: "250px", height: "auto" }}
                        src={item["imgUrl"]}
                        alt={""}
                      />

                      {item["token"]["data"]["token_id"] ? (
                        <p>
                          NFT ID:
                          {item["token"]["data"]["token_id"]}
                          <br />
                          NFT Address:
                          {item["token"]["data"]["token_address"]}
                          <br />
                        </p>
                      ) : (
                        <p>
                          Token Symbol:{" "}
                          {item["symbol"] ? item["symbol"] : "ETH"}
                          <br />
                          Quantity:
                          {ethers.utils.formatEther(
                            item["token"]["data"]["quantity"]
                          )}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {readyToWithdrawInventory.length !== 0 ? (
            <div>
              <h1>Complete Withdrawal:</h1>

              <div className="deposit-withdraw-wrapper">
                <div className="inventory-wrapper">
                  {readyToWithdrawInventory.map((item) => (
                    <div
                      key={
                        item["token"]["data"]["token_address"] +
                        item["token"]["data"]["token_id"]
                      }
                      className="inventory-item"
                    >
                      <img
                        style={{ width: "250px", height: "auto" }}
                        src={item["imgUrl"]}
                        alt={""}
                      />

                      <p>
                        {
                          //fixme token symbol
                          item["token"]["type"] === "ERC721"
                            ? `Token ID: ${item["token"]["data"]["token_id"]}`
                            : `${ethers.utils.formatEther(
                                item["token"]["data"]["quantity"]
                              )} ${item["symbol"]}`
                        }
                      </p>
                      <Button
                        size="small"
                        variant="contained"
                        component="label"
                        onClick={() => {
                          item["token"]["type"] === "ERC721"
                            ? completeWithdrawalNFT(
                                item["token"]["data"]["token_id"],

                                item["token"]["data"]["token_address"]
                              )
                            : completeWithdrawalErc20(
                                item["token"]["data"]["token_address"],
                                item["token"]["data"]["token_address"]
                              );
                        }}
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
