import { ethers } from "ethers";

export const connectWallet = async () => {

  try {

    if (!window.ethereum) {

      alert("Install MetaMask");

      return null;
    }

    // Request wallet connection
    const accounts =
      await window.ethereum.request({

        method: "eth_requestAccounts",
      });

    // Create provider
    const provider =
      new ethers.BrowserProvider(
        window.ethereum
      );

    // Get signer
    const signer =
      await provider.getSigner();

    // Wallet address
    const address =
      accounts[0];

    return {

      provider,
      signer,
      address,
    };

  } catch (error) {

    console.log(error);

    return null;
  }
};