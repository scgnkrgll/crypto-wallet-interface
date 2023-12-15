"use client"

import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes"
import { ReactNode } from "react"
import { BaseError } from "viem"
import { useNetwork, useSwitchNetwork } from "wagmi"

const NetworkGuard = ({ children }: { children: ReactNode }) => {
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  if (chain?.unsupported)
    return (
      <Card variant="classic" size="4" style={{ width: 500 }}>
        <Box height="7" mb="4">
          <Heading as="h3" size="6" mt="-1">
            Unsupported Network
          </Heading>
        </Box>
        <Text as="p">Connected to {chain?.name ?? chain?.id}</Text>

        <Text as="p" mb="2">
          The network you have connected is not supported at the moment.
        </Text>

        <Text as="p" mb="4">
          Please switch to one of the supported network below.
        </Text>

        {switchNetwork && (
          <Flex gap="3" direction="column">
            {chains.map((x) =>
              x.id === chain?.id ? null : (
                <Button key={x.id} onClick={() => switchNetwork(x.id)}>
                  {x.name}
                  {isLoading && x.id === pendingChainId && " (switching)"}
                </Button>
              )
            )}
          </Flex>
        )}

        {error && <div>{(error as BaseError).message}</div>}
      </Card>
    )

  return children
}

export default NetworkGuard
