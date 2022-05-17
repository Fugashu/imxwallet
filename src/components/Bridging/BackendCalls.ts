import { ropstenApiAddress } from "../constants";
import axios from "axios";

export async function getSymbolForToken(address: string) {
  let query = ropstenApiAddress + "/tokens/" + address;
  let result = await axios(query);
  return result.data.symbol;
}
