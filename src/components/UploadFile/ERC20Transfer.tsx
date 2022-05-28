import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ERC20TokenType, ImmutableXClient, Link } from "@imtbl/imx-sdk";
import { TextField } from "@mui/material";
import "./styles.css";
import Papa from "papaparse";
// @ts-ignore

import ERC20Template from "../../assets/csv_templates/ERC20TransferTemplate.csv";
import { getSymbolForToken } from "../Bridging/BackendCalls";
interface PostData {
  title: string;
  body: string;
  file: File | null;
}

interface ImxProps {
  walletAddress: string;
  apiClient: ImmutableXClient;
  imxLink: Link;
  apiAddress: string;
}

export default function ERC20Transfer(props: ImxProps) {
  const [formValues, setFormValues] = useState<PostData>({
    title: "",
    body: "",
    file: null,
  });

  const [ERC20TransferData, setERC20TransferData] = useState([
    {
      type: ERC20TokenType.ERC20,
      amount: "",
      symbol: "",

      tokenAddress: "",
      toAddress: "",
    },
  ]);
  const addInput = () => {
    const updateData = [
      ...ERC20TransferData,
      {
        type: ERC20TokenType.ERC20,
        amount: "",
        symbol: "",
        tokenAddress: "",
        toAddress: "",
      },
    ];

    // @ts-ignore
    setERC20TransferData(updateData);
  };
  const removeInput = () => {
    ERC20TransferData.pop();
    setERC20TransferData([...ERC20TransferData]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updateData = [...ERC20TransferData];

    for (let i = 0; i < updateData.length; i++) {
      if (event.target.name === "wallet") {
        if (event.target.id === "Wallet-ID" + i) {
          updateData[i].toAddress = event.target.value;
        }
      } else if (event.target.name === "ERC20") {
        if (event.target.id === "ERC20-ID" + i) {
          updateData[i].amount = event.target.value;
        }
      } else if (event.target.name === "contract") {
        if (event.target.id === "Contract-ID" + i) {
          updateData[i].tokenAddress = event.target.value;
        }
      }
    }

    setERC20TransferData(updateData);
  };
  const addInputElements = ERC20TransferData.map(
    ({ amount, toAddress, tokenAddress }, key: number) => (
      <div className="InputETH">
        <TextField
          id={"Wallet-ID" + key}
          label="Wallet-ID"
          onChange={handleChange}
          name="wallet"
          variant="outlined"
          value={toAddress === "" ? "" : toAddress}
        />

        <TextField
          id={"ERC20-ID" + key}
          label="ERC20"
          onChange={handleChange}
          variant="outlined"
          name="ERC20"
          value={amount === "" ? "" : amount}
        />
        <TextField
          id={"Contract-ID" + key}
          label="Contract-ID"
          onChange={handleChange}
          variant="outlined"
          name="contract"
          value={tokenAddress === "" ? "" : tokenAddress}
        />
      </div>
    )
  );
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      // @ts-ignore
      Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // @ts-ignore
          let data = results.data.map((d: any) => ({
            toAddress: d.toAddress,
            amount: d.amount,
            tokenAddress: d.tokenAddress,
            type: ERC20TokenType.ERC20,
            symbol: "",
          }));

          if (
            ERC20TransferData[0].amount === "" &&
            ERC20TransferData[0].toAddress === "" &&
            ERC20TransferData[0].tokenAddress === ""
          ) {
            setERC20TransferData(data);
          } else {
            setERC20TransferData(ERC20TransferData.concat(data));
          }
        },
      });
    } catch (e) {
      console.log(`Error while depositing:${e}`);
    }
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      file: event.target.files ? event.target.files[0] : null,
    }));
  };

  function transferERC20() {
    try {
      // @ts-ignore
      getSymbolForToken(props.apiAddress, ERC20TransferData);
      // @ts-ignore
      props.imxLink.transfer(ERC20TransferData);
    } catch (e) {
      console.log(`Error while depositing:${e}`);
    }
  }

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setERC20TransferData(
      ERC20TransferData.filter(
        (element) =>
          element.toAddress != "" &&
          element.amount != "" &&
          element.tokenAddress != ""
      )
    );

    transferERC20();
  };

  return (
    <form onSubmit={submitForm}>
      <div className="Uploader">
        <div className="deposit-withdraw-section">
          <h1>ERC20 Selection:</h1>
          <div className="deposit-withdraw-group">
            <TextField
              id="outlined-basic"
              label="Selected File: "
              variant="outlined"
              inputProps={{ readOnly: true }}
              value={formValues.file?.name ?? "No File selected.."}
            />

            <Button size="large" variant="contained" component="label">
              Upload File
              <input
                type="file"
                onChange={handleFileChange}
                accept=".csv"
                hidden
              />
            </Button>
            <a
              href={ERC20Template}
              download="NftTransferTemplate"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Button size="large" variant="contained" component="label">
                Get Template
              </Button>
            </a>
          </div>
          <div className="NFT-Items">
            {addInputElements}

            <Button
              size="large"
              variant="contained"
              component="label"
              onClick={addInput}
              id="AddItem"
            >
              Add Item
            </Button>

            <Button
              size="large"
              variant="contained"
              component="label"
              onClick={removeInput}
              id="RemoveItem"
            >
              Remove Item
            </Button>
          </div>

          <Box marginY={3}>
            <Button size="large" variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </div>
      </div>
    </form>
  );
}
