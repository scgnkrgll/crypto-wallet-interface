import { defineConfig } from "@wagmi/cli"
import { react } from "@wagmi/cli/plugins"
import * as chains from "wagmi/chains"

import { CHR_ABI } from "./abis/CHR"

export default defineConfig(() => {
  return {
    out: "src/generated.ts",
    contracts: [
      {
        abi: CHR_ABI,
        name: "CHR",
        address: {
          [chains.mainnet.id]: "0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2",
          [chains.bscTestnet.id]: "0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2",
        },
      },
    ],
    plugins: [react()],
  }
})
