import React, { useState } from "react";
import { ETHTokenType, ImmutableXClient, Link } from "@imtbl/imx-sdk";
import NftTransfer from "./NftTransfer"
import EthTransfer from "./EthTransfer"
import "./styles.css";


interface ImxProps {
  walletAddress: string;
  apiClient: ImmutableXClient;
  imxLink: Link;
}

export default function BatchTransfer(props: ImxProps) {
    return(
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
        </div>
    )
}
