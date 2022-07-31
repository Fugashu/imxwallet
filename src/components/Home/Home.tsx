import React from "react";
import ActionAreaCard from "../ActionCards/ActionCards";
import cardData from "../ActionCards/cardData";
import MoonPayIco from "../../assets/png/MoonPay.png";
import IMXLogo from "../../assets/png/WelcomeIm.png";
import "./styles.css";
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
      {props.walletAddress === "undefined" ? (
          <div >
            <img id={"welImg"} src={IMXLogo} alt=""/>
            <h1>The hosted website provides useful wallet actions for the
              ImmutableX Ecosystem.
              Connect your wallet to get started!</h1>


      </div>) : (
        <div>
          <h1>The hosted website provides useful wallet actions for the ImmutableX Ecosystem.</h1>


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
          <h2>You want to buy Ethereum or IMX with your credit card? You can! Fire up Moonpay and enter the
            Crypto World.</h2>
          <input type="image" alt="" src={MoonPayIco} id={"moon"} onClick={launchMoonpay}/>

        </div>
      )}
    </div>
  );
};

export default Home;
