/* eslint-disable */
import {
  Link,
  ImmutableXClient,
  ImmutableMethodResults,
  ERC721TokenType,
  ETHTokenType,
  ImmutableRollupStatus,
} from "@imtbl/imx-sdk";
import React, { useEffect, useState } from "react";
import BridgeSectionDeposit from "./BridgeSectionDeposit";
import BridgeSectionWithdraw from "./BridgeSectionWithdraw";
import BridgeSectionWithdrawalStatus from "./BridgeSectionWithdrawalStatus";
interface BridgingProps {
  imxLink: Link;
  walletAddress: string;
  apiClient: ImmutableXClient;
  apiAddress: string;
}
//fixme different api endpoints for mainnet and ropsten
const Bridging = (props: BridgingProps) => {
  return (
    <div>
      {props.walletAddress === "undefined" ? null : (
        <div>
          <BridgeSectionDeposit
            imxLink={props.imxLink}
            walletAddress={props.walletAddress}
            apiClient={props.apiClient}
            apiAddress={props.apiAddress}
          />

          <BridgeSectionWithdraw
            imxLink={props.imxLink}
            walletAddress={props.walletAddress}
            apiClient={props.apiClient}
            apiAddress={props.apiAddress}
          />

          <BridgeSectionWithdrawalStatus
            imxLink={props.imxLink}
            walletAddress={props.walletAddress}
            apiClient={props.apiClient}
            apiAddress={props.apiAddress}
          />
        </div>
      )}
    </div>
  );
};

export default Bridging;
