import React, { useMemo } from "react";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { NetworkConnector } from "@web3-react/network-connector";
import { Web3Provider } from "@ethersproject/providers";
import GetNonce from "./GetNonce";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const ExampleApp = () => {
  const { activate, active } = useWeb3React();

  useMemo(() => {
    console.log("Activating");
    activate(
      new NetworkConnector({
        urls: {
          // 80001: "https://rpc-mumbai.matic.today",
          80001:
            "https://rpc-mumbai.maticvigil.com/v1/" +
            process.env.REACT_APP_MATICVIGIL_API_TOKEN,
        },
        defaultChainId: 80001,
        pollingInterval: 8000,
      }),
      () => console.log("it is connected to matic!"),
      true
    );
  }, []);

  return active ? <GetNonce /> : <>Loading provider</>;
};

export default () => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <ExampleApp />
  </Web3ReactProvider>
);
