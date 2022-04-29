import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ETHTokenType, ImmutableXClient, Link } from "@imtbl/imx-sdk";
import {TextField} from "@mui/material";
import "./styles.css";
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      file: event.target.files ? event.target.files[0] : null,
    }));
  };

  function x() {
    props.imxLink.transfer([
      {
        amount: "0.1",
        type: ETHTokenType.ETH,
        toAddress: "0x886cb3FD2bA9ffC69b98F8740279c723cbCAd230",
      },
    ]);
  }
  return (
    <div className="Uploader">
        <div className="deposit-withdraw-section">
            <h1>NFT Selection:</h1>
        <div className="deposit-withdraw-group">

      <TextField
          id="outlined-basic"
          label="Selected File: "
          variant="outlined"
          inputProps={
            { readOnly: true, }}

          value={formValues.file?.name ?? "No File selected.."}

      />



      <Button size="large" variant="contained" component="label">
        Upload File
        <input type="file" onChange={handleFileChange} hidden />
      </Button>
        </div>
        </div>
      <Button size="large" onClick={x} variant="contained" component="label">
        Send ETH
      </Button>

      <Box marginY={3}>
        <Button
          size="large"
          variant="contained"
          onClick={() => console.log("submit")}
        >
          Submit Post{" "}
        </Button>
      </Box>
    </div>
  );
}
