import React from 'react';
import {ImmutableXClient, Link} from "@imtbl/imx-sdk";
import {Link as RouterLink} from 'react-router-dom'
interface ImxProps {
    walletAddress: string,
    apiClient: ImmutableXClient,
    imxLink: Link,

}
const DepositNFT = (props:ImxProps) => {
    console.log(props);

    const routeToHome =
        <RouterLink to="/">
            <p>Wallet not connected. Return to home.</p>
        </RouterLink>;
    const displayWalletAddress = <h1>{props.walletAddress}</h1>;


    return (
        <div>
            {props.walletAddress === 'undefined' ?  routeToHome : displayWalletAddress}
            <h1>Deposit NFT</h1>
        </div>
    );
};

export default DepositNFT;
