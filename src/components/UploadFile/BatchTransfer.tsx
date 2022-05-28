import React from "react";
import { ImmutableXClient, Link } from "@imtbl/imx-sdk";
import NftTransfer from "./NftTransfer";
import EthTransfer from "./EthTransfer";
import ERC20Transfer from "./ERC20Transfer";
import "./styles.css";

interface ImxProps {
  walletAddress: string;
  apiClient: ImmutableXClient;
  imxLink: Link;
  apiAddress: string;
}

export default function BatchTransfer(props: ImxProps) {
  return (
    <div>
      <NftTransfer
        walletAddress={props.walletAddress}
        apiClient={props.apiClient}
        imxLink={props.imxLink}
      />
      <EthTransfer
        walletAddress={props.walletAddress}
        apiClient={props.apiClient}
        imxLink={props.imxLink}
      />
      <ERC20Transfer
        walletAddress={props.walletAddress}
        apiClient={props.apiClient}
        imxLink={props.imxLink}
        apiAddress={props.apiAddress}
      />
    </div>
  );
}
