import transfer from "../../assets/png/transfer.png";
import bridge from "../../assets/png/bridge.png";

const cardData = [
  {
    id: 1,
    imageString: transfer,
    actionName: "Batch Transfer",
    description: "You can transfer or airdrop multiple tokens to different recipients in a single transaction. " +
        "A csv template is provided where you can insert receiving addresses and the amount.",
    routerPath: "/batchTransfer",
  },

  {
    id: 2,
    imageString: bridge,
    actionName: "Bridge",
    description: "The Bridge feature allows you to swap tokens between Layer 1 Ethereum and Layer 2 Immutable X. " +
        "Simply insert the collection you want to view and bridge your assets with ease!",
    routerPath: "/bridge",
  },

];
export default cardData;
