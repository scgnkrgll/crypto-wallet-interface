"use client"

import { Button } from "@radix-ui/themes"
import { useAccount, useDisconnect } from "wagmi"

import Connected from "./Connected"

const DisconnectButton = () => {
  const { connector } = useAccount()

  const { disconnect } = useDisconnect()

  return (
    <Connected>
      <Button key="disconnect" onClick={() => disconnect()}>
        Disconnect from {connector?.name}
      </Button>
    </Connected>
  )
}

export default DisconnectButton
