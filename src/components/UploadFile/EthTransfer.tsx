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
interface NftData{
    token: string;
    wallet: string;
    count: number
}
export default function EthTransfer(props: ImxProps) {
    const [formValues, setFormValues] = useState<PostData>({
        title: "",
        body: "",
        file: null,
    });

    const [allEthData, setAllEthData] = useState([{Eth: "", wallet: "", count:0}]);
    const [count, setCount] = useState(0)



    const addToken = () =>{
        setCount(count + 1)
        setAllEthData([...allEthData, {Eth: "", wallet: "", count: count}])

    };

    const removeItem  = () =>{
        setCount(count - 1)
        allEthData.pop();
        setAllEthData([...allEthData]);
    };

    const handleChange =(event: React.ChangeEvent<HTMLInputElement>) =>{
        setAllEthData(prevState => {
            return{
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
        console.log(allEthData)
    };

    const addTokenElement = allEthData.map(element =>
        <div>
            <TextField
                id="Etherium"
                label={element.Eth ? element.Eth : "Etherium"}
                onChange={handleChange}
                name= {"Etherium"+ element.count}

                variant="outlined"

            />


            <TextField
                id="Wallet-ID"
                label={element.wallet ? element.wallet : "Wallet-ID"}
                onChange={handleChange}
                variant="outlined"
                name= {"wallet" + element.count}
            />

        </div>)





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
