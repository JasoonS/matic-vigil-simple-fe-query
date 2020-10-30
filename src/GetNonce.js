import { useMemo, useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

const daiAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getNonce",
    outputs: [
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const daiAbiEthers = [
  "function getNonce(address user) public view returns (uint256)",
];

const DAI_ADDRESS = "0x44bcf77ac60294db906f50c36e63af5d4c120a66";
const RANDOM_ETH_ADDRESS = "0xd3cbce59318b2e570883719c8165f9390a12bdd6";

export default () => {
  const [resultWeb3, updateResultWeb3] = useState(null);
  const [resultEthers, updateResultEthers] = useState(null);
  const { library } = useWeb3React();

  // Fetch with Ethers
  useMemo(async () => {
    try {
      const web3 = new Web3(library.provider);
      const daiContract = new web3.eth.Contract(daiAbi, DAI_ADDRESS);
      const result = await daiContract.methods
        .getNonce(RANDOM_ETH_ADDRESS)
        .call();
      updateResultWeb3(() => ({
        result: result.toString(),
      }));
    } catch (error) {
      updateResultWeb3(() => ({
        error: error.toString(),
      }));
    }
  }, []);

  // Fetch with web3
  useMemo(async () => {
    try {
      const daiContract = new ethers.Contract(DAI_ADDRESS, daiAbi, library);
      const result = await daiContract.getNonce(RANDOM_ETH_ADDRESS);
      updateResultEthers(() => ({
        result: result.toString(),
      }));
    } catch (error) {
      updateResultEthers(() => ({
        error: error.toString(),
      }));
    }
  }, []);

  return (
    <>
      {!!resultWeb3 ? (
        !!resultWeb3.error ? (
          <div>
            There was an error fetching nonce with web3: {resultWeb3.error}
          </div>
        ) : (
          <div>This is the nonce (from web3): {resultWeb3.result}</div>
        )
      ) : (
        <div>getting the nonce with web3</div>
      )}
      <br />
      {!!resultEthers ? (
        !!resultEthers.error ? (
          <div>
            There was an error fetching nonce with ethersjsh:{" "}
            {resultEthers.error}
          </div>
        ) : (
          <div>This is the nonce (from ethersjs): {resultEthers.result}</div>
        )
      ) : (
        <div>getting the nonce with ETHERSjs</div>
      )}
    </>
  );
};
