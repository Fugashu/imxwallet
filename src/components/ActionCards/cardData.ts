import transfer from "../../assets/png/transfer.png";
import bridge from "../../assets/png/bridge.png";

const cardData = [
  {
    id: 1,
    imageString: transfer,
    actionName: "Batch Transfer",
    description: "Batch transfer or airdrop tokens",
    routerPath: "/batchTransfer",
  },

  {
    id: 2,
    imageString: bridge,
    actionName: "Bridge",
    description: "Transfer Tokens between Ethereum L1 and IMX L2",
    routerPath: "/bridge",
  },
];
export default cardData;
