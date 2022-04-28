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
interface BridgingProps {
  imxLink: Link;
  walletAddress: string;
  apiClient: ImmutableXClient;
}

const Bridging = (props: BridgingProps) => {
  // withdrawals
  const [preparingWithdrawals, setPreparingWithdrawals] =
    useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
  const [readyWithdrawals, setReadyWithdrawals] =
    useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
  const [completedWithdrawals, setCompletedWithdrawals] =
    useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);

  useEffect(() => {
    reloadWithdrawals();
  }, []);

  async function reloadWithdrawals(): Promise<void> {
    console.log("Reloading Withdrawals");
    setPreparingWithdrawals(
      await props.apiClient.getWithdrawals({
        user: props.walletAddress,
        rollup_status: ImmutableRollupStatus.included,
      })
    ); // included in batch awaiting confirmation
    setReadyWithdrawals(
      await props.apiClient.getWithdrawals({
        user: props.walletAddress,
        rollup_status: ImmutableRollupStatus.confirmed,
        withdrawn_to_wallet: false,
      })
    ); // confirmed on-chain in a batch and ready to be withdrawn
    setCompletedWithdrawals(
      await props.apiClient.getWithdrawals({
        user: props.walletAddress,
        withdrawn_to_wallet: true,
      })
    ); // confirmed on-chain in a batch and already withdrawn to L1 wallet
  }

  return (
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

      <Button
        variant="contained"
        component="label"
        size="small"
        onClick={reloadWithdrawals}
      >
        Reload Withdrawals
      </Button>
      <div>
        Withdrawals being prepared:
        {JSON.stringify(preparingWithdrawals)}
      </div>
      <br />
      <br />
      <div>
        Ready for withdrawal:
        {JSON.stringify(readyWithdrawals)}
      </div>
      <br />
      <br />
      <div>
        Withdrawn to wallet:
        {JSON.stringify(completedWithdrawals)}
      </div>
    </div>
  );
};

export default Bridging;
