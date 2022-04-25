import React from "react";
import ActionAreaCard from "../ActionCards/ActionCards";
import WalletConnection from "../WalletConnection/WalletConnection";
import cardData from "../ActionCards/cardData";

import "./styles.css";
const Home = () => {
  return (
    <div>
      <WalletConnection />

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
    </div>
  );
};

export default Home;
