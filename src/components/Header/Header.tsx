import React from "react";
import Button from "@mui/material/Button";
import "./styles.css";
import githubLogo from "../../assets/png/GitHub-Mark-Light-64px.png";

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
      <a href={"https://github.com/Fugashu/imxwallet"}>
        <img alt="github-repo" src={githubLogo} />
      </a>
      <div className="item-wrapper">
        <Button
          size="large"
          style={{ margin: "10px" }}
          onClick={props.handleClickMainnet}
          variant="contained"
          component="label"
          sx={{ backgroundColor: "#23C6DD" }}
        >
          Connect Mainnet
        </Button>

        <Button
          size="large"
          style={{ margin: "10px" }}
          onClick={props.handleClickRopsten}
          variant="contained"
          component="label"
          sx={{ backgroundColor: "#23C6DD" }}
        >
          Connect Ropsten
        </Button>

        {props.connectedAddress === "undefined" ? null : (
          <p className="info-block">
            Connected Address: {props.connectedAddress}
          </p>
        )}
        {props.connectedNetwork === "undefined" ? null : (
          <p className="info-block">Active Network: {props.connectedNetwork}</p>
        )}
      </div>
    </div>
  );
};

export default Header;
