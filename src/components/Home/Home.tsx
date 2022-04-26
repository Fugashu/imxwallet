import React, {useEffect, useState} from "react";
import ActionAreaCard from "../ActionCards/ActionCards";
import cardData from "../ActionCards/cardData";

import "./styles.css";
import Button from "@mui/material/Button";
interface HomeWallet {
    walletAddress: string;
    handleClick() :Promise<void>;
}

const Home = (props:HomeWallet) => {


  return (
    <div>

        {props.walletAddress === 'undefined' ?         <Button variant="contained" component="label" size="small" onClick={props.handleClick}>Connect Wallet</Button>
            :
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
      </div>}
    </div>
  );
};

export default Home;
