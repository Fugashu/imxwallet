import React from "react";
import Button from "@mui/material/Button";
import "./styles.css";
interface NetworkSwitchFunctions {
  handleClickMainnet: any;
  handleClickRopsten: any;
  connectedAddress: string;
  connectedNetwork: string;
}
const Header = (props: NetworkSwitchFunctions) => {
  return (
    <div className="header-wrapper">
      <h1> IMX WALLET TOOLS</h1>
      <div className="item-wrapper">
        <Button
          size="large"
          style={{ margin: "10px" }}
          onClick={props.handleClickMainnet}
          variant="contained"
          component="label"
        >
          Connect Mainnet
        </Button>

        <Button
          size="large"
          style={{ margin: "10px" }}
          onClick={props.handleClickRopsten}
          variant="contained"
          component="label"
        >
          Connect Ropsten
        </Button>

        {props.connectedAddress === "undefined" ? null : (
          <p> Connected Address: {props.connectedAddress}</p>
        )}
        {props.connectedNetwork === "undefined" ? null : (
          <p> Active Network: {props.connectedNetwork}</p>
        )}
      </div>
    </div>
  );
};

export default Header;
