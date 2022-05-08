import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ETHTokenType, ImmutableXClient, Link } from "@imtbl/imx-sdk";
import {TextField} from "@mui/material";
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

    const [allEthData, setAllEthData] = useState([{Eth: "", wallet: "", key:1}]);



    const addInput = () =>{
        const updateDate = [...allEthData, {Eth: "", wallet: "", key: allEthData.length + 1}]
        setAllEthData(updateDate)
    };

    const removeInput  = () =>{
        allEthData.pop();
        setAllEthData([...allEthData]);
    };

    const handleChange =(event: React.ChangeEvent<HTMLInputElement>) =>{

        let updateData = [...allEthData]

        for(let i= 0 ; i < updateData.length ; i++)
        {
            if (event.target.name === "wallet")
            {
                if(event.target.id === "Wallet-ID" + updateData[i].key)
                {
                    updateData[i].wallet = event.target.value
                }
            }
            else if (event.target.name === "Etherium")
            {
                if (event.target.id === "Etherium-ID" + updateData[i].key)
                {
                    updateData[i].Eth = event.target.value
                }
            }
        };

        setAllEthData(updateData)
        console.log(allEthData)
    };

    const addInputElements = allEthData.map(({Eth,wallet,key})=>(
        <div className="InputETH">
            <TextField
                id={"Wallet-ID" + key}
                label="Wallet-ID"
                onChange={handleChange}
                name= "wallet"
                variant="outlined"
                value={wallet === "" ? "": wallet}

            />

            <TextField
                id={"Etherium-ID" + key}
                label="Etherium"
                onChange={handleChange}
                variant="outlined"
                name= "Etherium"
                value={Eth === "" ? "": Eth}

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
                let data = results.data.map((d, key) => ({wallet: d.wallet, Eth: d.Eth, key:key}))
                // @ts-ignore

                setAllEthData(data)


            },
        });
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

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        // Preventing the page from reloading
        event.preventDefault();

        // Do something
        console.log(allEthData);
    }


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
                {/* <Button size="large" onClick={x} variant="contained" component="label">
        Send ETH
      </Button>*/}


            </div>
        </form>
    );
}
