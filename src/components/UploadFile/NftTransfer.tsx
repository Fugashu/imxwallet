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

    const [allNftData, setAllNftTokens] = useState([{token: "" , wallet: ""  }]);



    const addToken = () =>{
        setAllNftTokens([...allNftData, {token: "", wallet: ""}])

    };

    const removeItem  = () =>{
        allNftData.pop();
        setAllNftTokens([...allNftData]);
    };



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
    const addTokenElement = allNftData.map(element =>
        <div>
            <TextField
                id="NFT-Token"
                label={element.token ? element.token : "NFT-Token"}
                variant="outlined"

            />


            <TextField
                id="Wallet-ID"
                label={element.wallet ? element.wallet : "Wallet-ID"}
                variant="outlined"
            />

        </div>)
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
                <div className="NFT-Items">


                    {addTokenElement}

                    <Button
                        size="large"
                        variant="contained"
                        component="label"
                        onClick={addToken}
                        id="AddItem"
                    >
                        Add Item
                    </Button>

                    <Button
                        size="large"
                        variant="contained"
                        component="label"
                        onClick={removeItem}
                        id="RemoveItem"
                    >
                        Remove Item
                    </Button>

                </div>

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
            {/* <Button size="large" onClick={x} variant="contained" component="label">
        Send ETH
      </Button>*/}


        </div>
    );
}
