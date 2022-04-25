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
    routerPath: "/sub3",
  },
];
export default cardData;
