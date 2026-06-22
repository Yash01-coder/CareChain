import { useEffect, useState } from "react";
import { FiCheckCircle, FiCreditCard, FiWifi } from "react-icons/fi";
import { SiEthereum } from "react-icons/si";
import { motion } from "framer-motion";

function ConnectWallet() {
  const [wallet, setWallet] = useState("");
  const [network, setNetwork] = useState("");

  const shortWallet = wallet
    ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
    : "";

  const getNetworkName = (chainId) => {
    const networks = {
      "0x1": "Ethereum",
      "0xaa36a7": "Sepolia",
      "0x7a69": "Hardhat",
      "0x539": "Localhost",
    };

    return networks[chainId] || "Web3";
  };

  const loadExistingWallet = async () => {
    const savedWallet = localStorage.getItem("walletAddress");

    if (savedWallet) {
      setWallet(savedWallet);
    }

    if (window.ethereum) {
      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      setNetwork(getNetworkName(chainId));
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask to connect your wallet");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      setWallet(accounts[0]);
      setNetwork(getNetworkName(chainId));

      localStorage.setItem("walletAddress", accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadExistingWallet();

    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setWallet("");
        localStorage.removeItem("walletAddress");
        return;
      }

      setWallet(accounts[0]);
      localStorage.setItem("walletAddress", accounts[0]);
    };

    const handleChainChanged = (chainId) => {
      setNetwork(getNetworkName(chainId));
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  return (
    <motion.button
      type="button"
      onClick={connectWallet}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="
        group
        relative
        flex
        h-14
        min-w-[230px]
        items-center
        justify-center
        gap-3
        overflow-hidden
        rounded-full
        border
        border-cyan-300/25
        bg-white/10
        px-6
        text-sm
        font-black
        text-white
        shadow-2xl
        shadow-cyan-500/10
        backdrop-blur-xl
        transition
        hover:border-cyan-300/50
        hover:bg-cyan-300/10
      "
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-full" />

      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-purple-600 shadow-lg shadow-purple-900/30">
        {wallet ? (
          <FiCheckCircle className="text-lg text-white" />
        ) : (
          <SiEthereum className="text-lg text-white" />
        )}
      </span>

      <span className="relative flex flex-col items-start leading-tight">
        <span>{wallet ? shortWallet : "Connect Wallet"}</span>

        <span className="mt-0.5 flex items-center gap-1 text-[11px] font-bold text-cyan-100/75">
          {wallet ? (
            <>
              <FiWifi />
              {network || "Connected"}
            </>
          ) : (
            <>
              <FiCreditCard />
              MetaMask
            </>
          )}
        </span>
      </span>
    </motion.button>
  );
}

export default ConnectWallet;