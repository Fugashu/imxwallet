import axios from "axios";

export async function getImageForItem(
  endpoint: string,
  tokenAddress: string,
  tokenId: string
) {
  let query = endpoint + "/assets/" + tokenAddress + "/" + tokenId;
  let result = await axios(query);
  return result.data.image_url;
}

export async function getSymbolForToken(endpoint: string, address: string) {
  let query = endpoint + "/tokens/" + address;
  let result = await axios(query);
  return result.data.symbol;
}

export async function callInventory(
  endpoint: string,
  collectionAddress: string,
  walletAddress: string,
  chain: string
) {
  return await axios(
    endpoint +
      "/assets?collection=" +
      collectionAddress +
      "&user=" +
      walletAddress +
      "&status=" +
      chain
  )
    .catch((reason) => {
      alert("Collection was not found");
    })
    .then((value) => {
      console.log(value);
      return value;
    });
}

export async function callCompletedWithdrawals(
  endpoint: string,
  walletAddress: string,
  rollupStatus: string
) {
  return await axios(
    endpoint +
      "/withdrawals?withdrawn_to_wallet=" +
      false +
      "&user=" +
      walletAddress +
      "&rollup_status=" +
      rollupStatus
  ).then((value) => {
    return value;
  });
}
