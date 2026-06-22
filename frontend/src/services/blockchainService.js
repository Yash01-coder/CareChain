import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../utils/contracts";
import ABI from "../abi/RecordRegistryABI.json";

export const getContract =
async () => {

 const provider =
   new ethers.BrowserProvider(
     window.ethereum
   );

 const signer =
   await provider.getSigner();

 return new ethers.Contract(
   CONTRACT_ADDRESS,
   ABI,
   signer
 );
};