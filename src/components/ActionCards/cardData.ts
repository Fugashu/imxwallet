import imx from "../../assets/png/imx.png";

const cardData = [
  {
    id: 1,
    imageString: imx,
    actionName: "Batch Transfer",
    description: "Batch transfer or airdrop tokens",
    routerPath: "/batchTransfer",
  },
  {
    id: 2,
    imageString: imx,
    actionName: "Single Asset Transfer",
    description: "Transfer an asset to another address ",
    routerPath: "/singleTransfer",
  },
  {
    id: 3,
    imageString: imx,
    actionName: "Bridge",
    description: "Transfer Tokens between Ethereum L1 and IMX L2",
    routerPath: "/bridge",
  },
];
export default cardData;
