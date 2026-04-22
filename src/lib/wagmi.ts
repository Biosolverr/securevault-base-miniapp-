import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const config = createConfig({
  chains: [base],

  connectors: [
    coinbaseWallet({
      appName: "SecureVault",
      preference: "smartWalletOnly"
    })
  ],

  transports: {
    [base.id]: http("https://mainnet.base.org")
  }
});
