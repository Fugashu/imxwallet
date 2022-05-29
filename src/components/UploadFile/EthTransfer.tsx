import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ETHTokenType, ImmutableXClient, Link } from "@imtbl/imx-sdk";
import { TextField } from "@mui/material";
import "./styles.css";
import Papa from "papaparse";
// @ts-ignore
import EthTemplate from "../../assets/csv_templates/EthereumTransferTemplate.csv";

interface PostData {
  title: string;
  body: string;
  file: File | null;
}

interface ImxProps {
  walletAddress: string;
  apiClient: ImmutableXClient;
  imxLink: Link;
}

export default function EthTransfer(props: ImxProps) {
  const [formValues, setFormValues] = useState<PostData>({
    title: "",
    body: "",
    file: null,
  });

  const [EthTransferData, setEthTransferData] = useState([
    {
      type: ETHTokenType.ETH,
      amount: "",
      toAddress: "",
    },
  ]);
  const addInput = () => {
    const updateDate = [
      ...EthTransferData,
      { type: ETHTokenType.ETH, amount: "", toAddress: "" },
    ];
    setEthTransferData(updateDate);
  };

  const removeInput = () => {
    EthTransferData.pop();
    setEthTransferData([...EthTransferData]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updateData = [...EthTransferData];
    for (let i = 0; i < updateData.length; i++) {
      if (event.target.name === "wallet") {
        if (event.target.id === "Wallet-ID" + i) {
          updateData[i].toAddress = event.target.value;
        }
      } else if (event.target.name === "Ethereum") {
        if (event.target.id === "Ethereum-ID" + i) {
          updateData[i].amount = event.target.value;
        }
      }
    }

    setEthTransferData(updateData);
  };

  const addInputElements = EthTransferData.map(
    ({ amount, toAddress }, key: number) => (
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
          id={"Ethereum-ID" + key}
          label="Ethereum"
          onChange={handleChange}
          variant="outlined"
          name="Ethereum"
          value={amount === "" ? "" : amount}
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
            type: ETHTokenType.ETH,
          }));
          // @ts-ignore
          if (
            EthTransferData[0].amount === "" &&
            EthTransferData[0].toAddress === ""
          ) {
            setEthTransferData(data);
          } else {
            setEthTransferData(EthTransferData.concat(data));
          }
        },
      });
    } catch (e) {
      console.log(`Error while depositing ETH:${e}`);
    }
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      file: event.target.files ? event.target.files[0] : null,
    }));
  };

  function transferEth() {
    try {
      props.imxLink.transfer(EthTransferData);
    } catch (e) {
      console.log(`Error while depositing ETH:${e}`);
    }
  }

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();
    setEthTransferData(
      EthTransferData.filter(
        (element) => element.toAddress !== "" && element.amount !== ""
      )
    );

    transferEth();
  };

  return (
    <form onSubmit={submitForm}>
      <div className="Uploader">
        <div className="deposit-withdraw-section">
          <h1>Ethereum Selection:</h1>
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
              href={EthTemplate}
              rel="noreferrer"
              download="EthereumTransferTemplate"
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
