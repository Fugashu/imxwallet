import React from "react";
import Button from "@mui/material/Button";

interface NetworkSwitchFunctions {
  handleClickMainnet: any;
  handleClickRopsten: any;
  connectedAddress: string;
  connectedNetwork: string;
}
const Header = (props: NetworkSwitchFunctions) => {
  return (
    <div>
      <h1> IMX WALLET TOOLS</h1>
      <Button
        onClick={props.handleClickMainnet}
        variant="contained"
        component="label"
        size="small"
      >
        Connect Mainnet
      </Button>

      <Button
        onClick={props.handleClickRopsten}
        variant="contained"
        component="label"
        size="small"
      >
        Connect Ropsten
      </Button>
      {props.connectedAddress === "undefined" ? null : (
        <h1> Connect Address:{props.connectedAddress}</h1>
      )}
      {props.connectedNetwork === "undefined" ? null : (
        <h1> Active Network:{props.connectedNetwork}</h1>
      )}
    </div>
  );
};

export default Header;
