import React, {useEffect, useState} from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import DepositNFT from "./components/DepositNFT/DepositNFT";
import WithdrawNFT from "./components/WithdrawNFT/WithdrawNFT";
import BatchTransfer from "./components/UploadFile/BatchTransfer";
import {ImmutableMethodResults, ImmutableXClient, Link} from "@imtbl/imx-sdk";


function App() {

    const imxLink = new Link('https://link.ropsten.x.immutable.com');
    const [walletAddress, setWalletAddressAddress] = useState('undefined');
    const [balance, setBalance] = useState<ImmutableMethodResults.ImmutableGetBalanceResult>(Object);
    const [apiClient, setApiClient] = useState<ImmutableXClient>(Object);


    useEffect(() => {
        buildIMX().then(r => console.log('IMX Client built successfully'))
    }, [])

    // initialise an Immutable X Client to interact with apis more easily
    async function buildIMX() {
        const publicApiUrl: string = 'https://api.ropsten.x.immutable.com/v1' ?? '';
        setApiClient(await ImmutableXClient.build({publicApiUrl}))
    }

    // register and/or setup a user
    async function linkSetup(): Promise<void> {
        const res = await imxLink.setup({})
        setWalletAddressAddress(res.address)
        setBalance(await apiClient.getBalance({user: res.address, tokenAddress: 'eth'}))
    }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home walletAddress={walletAddress} handleClick={linkSetup}/>} />
        <Route path="/sub1" element={<DepositNFT walletAddress={walletAddress} apiClient={apiClient} imxLink={imxLink} />} />
        <Route path="/sub2" element={<WithdrawNFT walletAddress={walletAddress} apiClient={apiClient} imxLink={imxLink} />} />
        <Route path="/sub3" element={<BatchTransfer />} />
      </Routes>
    </div>
  );
}

export default App;
