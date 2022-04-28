import React, { useState } from "react";
import {
  ImmutableMethodResults,
  ImmutableRollupStatus,
  ImmutableXClient,
  Link,
} from "@imtbl/imx-sdk";
import Button from "@mui/material/Button";
import "./styles.css";

interface BridgeSectionWithdrawalStatusInterface {
  imxLink: Link;
  walletAddress: string;
  apiClient: ImmutableXClient;
}
const BridgeSectionWithdrawalStatus = (
  props: BridgeSectionWithdrawalStatusInterface
) => {
  // withdrawals
  const [preparingWithdrawals, setPreparingWithdrawals] =
    useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
  const [readyWithdrawals, setReadyWithdrawals] =
    useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
  const [completedWithdrawals, setCompletedWithdrawals] =
    useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);

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
    <div className="deposit-withdraw-section">
      <h1>Withdrawal Status:</h1>
      <Button
        size="large"
        variant="contained"
        component="label"
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

export default BridgeSectionWithdrawalStatus;
