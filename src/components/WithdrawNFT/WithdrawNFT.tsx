import React from "react";
import {ImmutableXClient, Link} from "@imtbl/imx-sdk";


interface ImxProps {
    walletAddress: string,
    apiClient: ImmutableXClient,
    imxLink: Link,

}
const WithdrawNFT = (props:ImxProps) => {
  return (
    <div>
      <h1>Withdraw NFT</h1>
    </div>
  );
};

export default WithdrawNFT;
