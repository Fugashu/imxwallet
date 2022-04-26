import imx from "../../assets/png/imx.png";

const cardData = [
  {
    id: 1,
    imageString: imx,
    actionName: "Deposit NFT",
    description: "Deposit an NFT from Ethereum L1 to IMX L2",
    routerPath: "/sub1",
  },

  {
    id: 2,
    imageString: imx,
    actionName: "Withdraw NFT",
    description: "Withdraw an NFT from IMX L2 to Ethereum L1",
    routerPath: "/sub2",
  },
  {
    id: 3,
    imageString: imx,
    actionName: "Batch Transfer",
    description: "Batch transfer or airdrop tokens",
    routerPath: "/batchTransfer",
  },
  {
    id: 4,
    imageString: imx,
    actionName: "Bridge",
    description: "Transfer Tokens between Ethereum L1 and IMX L2",
    routerPath: "/bridge",
  },
];
export default cardData;
