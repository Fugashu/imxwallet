import React, { useState } from "react";
import "./App.css";
import chainRpcData from "../src/components/BackendCalls/chainRpcData";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import BatchTransfer from "./components/UploadFile/BatchTransfer";
import { ImmutableXClient, Link } from "@imtbl/imx-sdk";
import Bridging from "./components/Bridging/Bridging";
import {
  mainnetLinkAddress,
  mainnetApiAddress,
  ropstenLinkAddress,
  ropstenApiAddress,
} from "./components/constants";
import Header from "./components/Header/Header";
import { CojodiNetworkSwitcher } from "./components/BackendCalls/CojodiNetworkSwitcher";

function App() {
  const imxLinkMainnet = new Link(mainnetLinkAddress);
  const imxLinkRopsten = new Link(ropstenLinkAddress);

  const [imxLink, setIMXLink] = useState<Link>(Object);
  const [walletAddress, setWalletAddressAddress] = useState("undefined");
  const [connectedNetwork, setConnectedNetwork] = useState("undefined");
  const [apiClient, setApiClient] = useState<ImmutableXClient>(Object);
  const [apiEndpointAddress, setApiEndpointAddress] = useState("");

  // initialise an Immutable X Client to interact with apis more easily
  const buildIMXMainnet = async () => {
    try {
      const publicApiUrl: string = mainnetApiAddress ?? "";
      setApiClient(await ImmutableXClient.build({ publicApiUrl }));
      setIMXLink(imxLinkMainnet);
      await CojodiNetworkSwitcher.switchToChain(chainRpcData.eth_mainnet);
      await linkSetupMainnet();
      setConnectedNetwork("Mainnet");
      setApiEndpointAddress(publicApiUrl);
    } catch (e) {
      console.log("Unknown Error while connecting wallet.");
    }
  };

  // TODO refator into one function
  /*const buildIMX = async (apiAddress: string, imxLink: Link) => {
    try {
      const publicApiUrl: string = ropstenApiAddress ?? "";
      setApiClient(await ImmutableXClient.build({ publicApiUrl }));
      setIMXLink(imxLinkRopsten);
      await CojodiNetworkSwitcher.switchToChain(chainRpcData.ropsten);
      await linkSetupRopsten();
      setConnectedNetwork("Ropsten");
    } catch (e) {
      console.log("Unknown Error while connecting wallet.");
    }
  };*/

  // initialise an Immutable X Client to interact with apis more easily
  const buildIMXRopsten = async () => {
    try {
      const publicApiUrl: string = ropstenApiAddress ?? "";
      setApiClient(await ImmutableXClient.build({ publicApiUrl }));
      setIMXLink(imxLinkRopsten);
      await CojodiNetworkSwitcher.switchToChain(chainRpcData.ropsten);
      await linkSetupRopsten();
      setConnectedNetwork("Ropsten");
      setApiEndpointAddress(publicApiUrl);
    } catch (e) {
      console.log("Unknown Error while connecting wallet.");
    }
  };

  // register and/or setup a user
  async function linkSetupMainnet(): Promise<void> {
    const res = await imxLinkMainnet.setup({});
    setWalletAddressAddress(res.address);
    //setBalance(await apiClient.getBalance({ user: res.address, tokenAddress: "eth" }));
  }

  // register and/or setup a user
  async function linkSetupRopsten(): Promise<void> {
    const res = await imxLinkRopsten.setup({});
    setWalletAddressAddress(res.address);
    //setBalance(await apiClient.getBalance({ user: res.address, tokenAddress: "eth" }));
  }

  return (
    <div className="App">
      <Header
        handleClickMainnet={buildIMXMainnet}
        handleClickRopsten={buildIMXRopsten}
        connectedAddress={walletAddress}
        connectedNetwork={connectedNetwork}
      />
      <hr id={"headerSep"}/>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              imxLink={imxLink}
              walletAddress={walletAddress}
              apiClient={apiClient}
            />
          }
        />
        <Route
          path="/bridge"
          element={
            <Bridging
              walletAddress={walletAddress}
              apiClient={apiClient}
              imxLink={imxLink}
              apiAddress={apiEndpointAddress}
            />
          }
        />
        <Route
          path="/batchTransfer"
          element={
            <BatchTransfer
              walletAddress={walletAddress}
              apiClient={apiClient}
              imxLink={imxLink}
              apiAddress={apiEndpointAddress}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
