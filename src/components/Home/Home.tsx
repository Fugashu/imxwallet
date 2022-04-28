import React from "react";
import ActionAreaCard from "../ActionCards/ActionCards";
import cardData from "../ActionCards/cardData";

import "./styles.css";
interface HomeWallet {
  walletAddress: string;
}

const Home = (props: HomeWallet) => {
  return (
    <div>
      {props.walletAddress === "undefined" ? null : (
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
      )}
    </div>
  );
};

export default Home;
