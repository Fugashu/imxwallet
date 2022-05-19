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

    const [allNftData, setAllNftData] = useState([{
        type: ERC721TokenType.ERC721, // Must be of type ERC721
        tokenId: "", // the token ID
        tokenAddress: "", // the collection address / contract address this token belongs to
        toAddress: "", // the wallet address this token is being transferred to
    }])

    const addInput = () =>{
        const updateData = [...allNftData, {type: ERC721TokenType.ERC721, tokenId: "", tokenAddress: "", toAdress: ""}]

        // @ts-ignore
        setAllNftData(updateData)


    };

    const removeInput  = () =>{
        allNftData.pop();
        setAllNftData([...allNftData]);
    };

    const handleChange =(event: React.ChangeEvent<HTMLInputElement>) =>{

       let updateData = [...allNftData]

            for(let i= 0 ; i < updateData.length ; i++)
            {
                if (event.target.name === "wallet")
                {
                    if(event.target.id === "Wallet-ID" + updateData[i].tokenId)
                    {
                        updateData[i].toAddress = event.target.value
                    }
                }
                else if (event.target.name === "token")
                {
                    if (event.target.id === "Token-ID" + updateData[i].tokenId)
                    {
                        updateData[i].tokenId = event.target.value
                    }
                }
                else if (event.target.name === "contract")
                {
                    if (event.target.id === "Contract-ID" + updateData[i].tokenId)
                    {
                        updateData[i].tokenAddress = event.target.value
                    }
                }
            };

        setAllNftData(updateData)


    };

    //ToDo: Sind TokenIds immer eineindeutig ?

    const addInputElements = allNftData.map(({tokenAddress,tokenId,toAddress})=>(
        <div className="InputNFT">
            <TextField
                id={"Wallet-ID" + tokenId}
                label="Wallet-ID"
                onChange={handleChange}
                name= "wallet"
                value={toAddress === "" ? "": toAddress}
                variant="outlined"

            />

            <TextField
                id={"Token-ID" + tokenId}
                label="NFT-Token"
                onChange={handleChange}
                variant="outlined"
                name= "token"
                value={tokenId === "" ? "": tokenId}

            />

            <TextField
                id={"Contract-ID" + tokenId}
                label="Contract-ID"
                onChange={handleChange}
                variant="outlined"
                name= "contract"
                value={tokenAddress === "" ? "": tokenAddress}

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
                let data = results.data.map((d) => ({tokenId: d.tokenId, toAddress: d.toAddress, tokenAddress: d.tokenAddress, type: ERC721TokenType.ERC721}))
                // @ts-ignore

                setAllNftData(data)



            },
        });

                setFormValues((prevFormValues) => ({
            ...prevFormValues,
            file: event.target.files ? event.target.files[0] : null,
        }));
    };


    function batchNftTransfer() {

        props.imxLink.transfer(allNftData);

    }

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        // Preventing the page from reloading
        event.preventDefault();

        batchNftTransfer();

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

        </div>
        </form>
    );
}
