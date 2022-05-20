import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ETHTokenType, ImmutableXClient, Link } from "@imtbl/imx-sdk";
import { TextField } from "@mui/material";
import "./styles.css";
import Papa from "papaparse";

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
    const updateDate2 = [
      ...EthTransferData,
      { type: ETHTokenType.ETH, amount: "", toAddress: "" },
    ];
    setEthTransferData(updateDate2);
  };

  const removeInput = () => {
    EthTransferData.pop();
    setEthTransferData([...EthTransferData]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updateData = [...EthTransferData];
    for (let i = 0; i < updateData.length; i++) {
      if (event.target.name === "wallet") {
        if (event.target.id === "Wallet-ID" + updateData[i].toAddress) {
          updateData[i].toAddress = event.target.value;
        }
      } else if (event.target.name === "Etherium") {
        if (event.target.id === "Etherium-ID" + updateData[i].toAddress) {
          updateData[i].amount = event.target.value;
        }
      }
    }

    setEthTransferData(updateData);
  };
  //ToDo: Eindeutigkeit von toAddress?
  const addInputElements = EthTransferData.map(({ amount, toAddress }) => (
    <div className="InputETH">
      <TextField
        id={"Wallet-ID" + toAddress}
        label="Wallet-ID"
        onChange={handleChange}
        name="wallet"
        variant="outlined"
        value={toAddress === "" ? "" : toAddress}
      />

      <TextField
        id={"Etherium-ID" + toAddress}
        label="Etherium"
        onChange={handleChange}
        variant="outlined"
        name="Etherium"
        value={amount === "" ? "" : amount}
      />
    </div>
  ));
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results: { data: any[] }) => {
        let data = results.data.map((d: any) => ({
          toAddress: d.toAddress,
          amount: d.amount,
          type: ETHTokenType.ETH,
        }));
        setEthTransferData(data);
      },
    });
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      file: event.target.files ? event.target.files[0] : null,
    }));
  };

  function transferEth() {
    props.imxLink.transfer(EthTransferData);
  }

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

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
