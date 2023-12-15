"use client"
import { Button, Dialog, Flex } from "@radix-ui/themes"
import { useState } from "react"
import { BaseError } from "viem"
import { useAccount, useConnect } from "wagmi"

import DisconnectButton from "./DisconnectButton"
import { useToast } from "./Toast"

const ConnectDialog = () => {
  const [open, setOpen] = useState(false)

  const { connector, isConnected } = useAccount()

  const toast = useToast()

  const { connect, connectors, isLoading, pendingConnector } = useConnect({
    onSettled() {
      setOpen(false)
    },
    onError(error) {
      toast({
        title: "Connection Failed",
        description: (error as BaseError).shortMessage ?? error.message,
        variant: "error",
      })
    },
  })

  if (isConnected) return <DisconnectButton />

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>Connect</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Connect your wallet</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Choose your wallet provider.
        </Dialog.Description>
        <Flex gap="3" direction="column">
          {connectors
            .filter((x) => x.ready && x.id !== connector?.id)
            .map((x) => (
              <Button key={x.id} onClick={() => connect({ connector: x })}>
                {x.name}
                {isLoading && x.id === pendingConnector?.id && " (connecting)"}
              </Button>
            ))}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default ConnectDialog
