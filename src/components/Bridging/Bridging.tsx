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
import Button from "@mui/material/Button";
import BridgeSectionWithdraw from "./BridgeSectionWithdraw";
import BridgeSectionWithdrawalStatus from "./BridgeSectionWithdrawalStatus";
interface BridgingProps {
  imxLink: Link;
  walletAddress: string;
  apiClient: ImmutableXClient;
}

const Bridging = (props: BridgingProps) => {
  return (
    <div>
      {props.walletAddress === "undefined" ? null : (
        <div>
          <BridgeSectionDeposit
            imxLink={props.imxLink}
            walletAddress={props.walletAddress}
            apiClient={props.apiClient}
          />

          <BridgeSectionWithdraw
            imxLink={props.imxLink}
            walletAddress={props.walletAddress}
            apiClient={props.apiClient}
          />

          <BridgeSectionWithdrawalStatus
            imxLink={props.imxLink}
            walletAddress={props.walletAddress}
            apiClient={props.apiClient}
          />
        </div>
      )}
    </div>
  );
};

export default Bridging;
