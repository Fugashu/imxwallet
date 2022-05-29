import React, { useState } from "react";
import Papa from "papaparse";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ERC721TokenType, ImmutableXClient, Link } from "@imtbl/imx-sdk";
import { TextField } from "@mui/material";
import "./styles.css";
// @ts-ignore
import NftTemplate from "../../assets/csv_templates/NftTransferTemplate.csv";
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

export default function BatchTransfer(props: ImxProps) {
  const [formValues, setFormValues] = useState<PostData>({
    title: "",
    body: "",
    file: null,
  });

  const [allNftData, setAllNftData] = useState([
    {
      type: ERC721TokenType.ERC721, // Must be of type ERC721
      tokenId: "", // the token ID
      tokenAddress: "", // the collection address / contract address this token belongs to
      toAddress: "", // the wallet address this token is being transferred to
    },
  ]);

  const addInput = () => {
    const updateData = [
      ...allNftData,
      {
        type: ERC721TokenType.ERC721,
        tokenId: "",
        tokenAddress: "",
        toAddress: "",
      },
    ];

    // @ts-ignore
    setAllNftData(updateData);
  };

  const removeInput = () => {
    allNftData.pop();
    setAllNftData([...allNftData]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updateData = [...allNftData];

    for (let i = 0; i < updateData.length; i++) {
      if (event.target.name === "wallet") {
        if (event.target.id === "Wallet-ID" + i) {
          updateData[i].toAddress = event.target.value;
        }
      } else if (event.target.name === "token") {
        if (event.target.id === "Token-ID" + i) {
          updateData[i].tokenId = event.target.value;
        }
      } else if (event.target.name === "contract") {
        if (event.target.id === "Contract-ID" + i) {
          updateData[i].tokenAddress = event.target.value;
        }
      }
    }

    setAllNftData(updateData);
  };

  const addInputElements = allNftData.map(
    ({ tokenAddress, tokenId, toAddress }, key: number) => (
      <div className="InputNFT">
        <TextField
          id={"Wallet-ID" + key}
          label="Wallet Address"
          onChange={handleChange}
          name="wallet"
          value={toAddress === "" ? "" : toAddress}
          variant="outlined"
        />

        <TextField
          id={"Token-ID" + key}
          label="NFT-Token"
          onChange={handleChange}
          variant="outlined"
          name="token"
          value={tokenId === "" ? "" : tokenId}
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
            tokenId: d.tokenId,
            toAddress: d.toAddress,
            tokenAddress: d.tokenAddress,
            type: ERC721TokenType.ERC721,
          }));
          // @ts-ignore
          if (
            allNftData[0].toAddress === "" &&
            allNftData[0].tokenAddress === "" &&
            allNftData[0].tokenId === ""
          ) {
            setAllNftData(data);
          } else {
            setAllNftData(allNftData.concat(data));
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

  function transferNft() {
    try {
      props.imxLink.transfer(allNftData);
    } catch (e) {
      console.log(`Error while depositing:${e}`);
    }
  }

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();
    setAllNftData(
      allNftData.filter(
        (element) =>
          element.toAddress != "" &&
          element.tokenId != "" &&
          element.tokenAddress != ""
      )
    );

    transferNft();
  };

  return (
    <form onSubmit={submitForm}>
      <div className="Uploader">
        <div className="deposit-withdraw-section">
          <h1>NFT Selection:</h1>
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
              href={NftTemplate}
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
