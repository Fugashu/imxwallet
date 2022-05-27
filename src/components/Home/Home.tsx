import React from "react";
import ActionAreaCard from "../ActionCards/ActionCards";
import cardData from "../ActionCards/cardData";

import "./styles.css";
import Button from "@mui/material/Button";
import { ImmutableXClient, Link } from "@imtbl/imx-sdk";
interface HomeWallet {
  imxLink: Link;
  walletAddress: string;
  apiClient: ImmutableXClient;
}

const Home = (props: HomeWallet) => {
  async function launchMoonpay() {
    //TODO not available?

    await props.imxLink.fiatToCrypto({ cryptoCurrencies: ["ETH"] });
  }
  return (
    <div>
      {props.walletAddress === "undefined" ? null : (
        <div>
          <div className="action-card-wrapper">
            {cardData.map((data) => {
              return (
                <ActionAreaCard
                  key={data.id}
                  imageString={data.imageString}
                  actionName={data.actionName}
                  description={data.description}
                  routerPath={data.routerPath}
                />
              );
            })}
          </div>
          <Button
            size="large"
            variant="contained"
            component="label"
            onClick={launchMoonpay}
          >
            Launch Moonpay
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
