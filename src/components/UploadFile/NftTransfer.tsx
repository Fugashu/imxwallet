import React, { useState } from "react";
import Papa from "papaparse";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {ERC721TokenType, ETHTokenType, ImmutableXClient, Link} from "@imtbl/imx-sdk";
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

    const [allNftData, setAllNftTokens] = useState ([{
        token: "",
        wallet: "",
        contract: "",
        key: 1
    }]);


    const addInput = () =>{
        const updateData = [...allNftData, {token: "", wallet: "", contract: "", key: allNftData.length + 1}]
        setAllNftTokens(updateData)


    };

    const removeInput  = () =>{
        allNftData.pop();
        setAllNftTokens([...allNftData]);
    };

    const handleChange =(event: React.ChangeEvent<HTMLInputElement>) =>{

       let updateData = [...allNftData]

            for(let i= 0 ; i < updateData.length ; i++)
            {
                if (event.target.name === "wallet")
                {
                    if(event.target.id === "Wallet-ID" + updateData[i].key)
                    {
                        updateData[i].wallet = event.target.value
                    }
                }
                else if (event.target.name === "token")
                {
                    if (event.target.id === "Token-ID" + updateData[i].key)
                    {
                        updateData[i].token = event.target.value
                    }
                }
                else if (event.target.name === "contract")
                {
                    if (event.target.id === "Contract-ID" + updateData[i].key)
                    {
                        updateData[i].contract = event.target.value
                    }
                }
            };

        setAllNftTokens(updateData)


    };


    const addInputElements = allNftData.map(({token,wallet,key, contract})=>(
        <div className="InputNFT">
            <TextField
                id={"Wallet-ID" + key}
                label="Wallet-ID"
                onChange={handleChange}
                name= "wallet"
                value={wallet === "" ? "": wallet}
                variant="outlined"

            />

            <TextField
                id={"Token-ID" + key}
                label="NFT-Token"
                onChange={handleChange}
                variant="outlined"
                name= "token"
                value={token === "" ? "": token}

            />

            <TextField
                id={"Contract-ID" + key}
                label="Contract-ID"
                onChange={handleChange}
                variant="outlined"
                name= "contract"
                value={contract === "" ? "": contract}

            />

        </div>

    ))

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: results => {
                // @ts-ignore
                let data = results.data.map((d, key) => ({wallet: d.wallet, token: d.token, contract: d.contract, key:key}))
                // @ts-ignore

                setAllNftTokens(data)
                console.log(data)


            },
        });

                setFormValues((prevFormValues) => ({
            ...prevFormValues,
            file: event.target.files ? event.target.files[0] : null,
        }));
    };


    function batchNftTransfer() {

        allNftData.map(element =>{

            props.imxLink.transfer([{
                type: ERC721TokenType.ERC721, // Must be of type ERC721
                tokenId: element.token, // the token ID
                tokenAddress: element.contract, // the collection address / contract address this token belongs to
                toAddress: element.wallet, // the wallet address this token is being transferred to
            },

            ])
        })

    }

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        // Preventing the page from reloading
        event.preventDefault();

        // Do something
        batchNftTransfer();
        console.log(allNftData);
    }


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
                        inputProps={
                            { readOnly: true, }}
                        value={formValues.file?.name ?? "No File selected.."}
                    />

                    <Button size="large" variant="contained" component="label">
                        Upload File
                        <input type="file" onChange={handleFileChange} accept=".csv" hidden />
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
                    <Button
                        size="large"
                        variant="contained"
                        type= "submit"
                    >
                    Submit
                    </Button>
                </Box>



            </div>
          {/*  { <Button size="large" onClick={x} variant="contained" component="label">
        Send ETH
      </Button>}*/}


        </div>
        </form>
    );
}
