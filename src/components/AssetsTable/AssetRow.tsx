"use client"

import { ChevronRightIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { Button, Callout, Table } from "@radix-ui/themes"
import { useBalance, useNetwork, useSwitchNetwork } from "wagmi"

import { SendNativeToken } from "../SendNativeToken"
import { AssetRowProps } from "./types"

const AssetRow = ({ address, chain }: AssetRowProps) => {
  const { chain: activeChain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const { data, isLoading } = useBalance({
    address,
    chainId: chain.id,
  })

  if (isLoading) return <>Loading...</>

  if (!data)
    return (
      <Callout.Root color="tomato">
        <Callout.Icon>
          <CrossCircledIcon />
        </Callout.Icon>
        <Callout.Text>Could not load balance information!</Callout.Text>
      </Callout.Root>
    )

  return (
    <Table.Row>
      <Table.RowHeaderCell>{chain.name}</Table.RowHeaderCell>
      <Table.Cell>
        {parseFloat(data.formatted).toFixed(4)} {data.symbol}
      </Table.Cell>
      <Table.Cell>
        {activeChain?.id === chain.id ? (
          <SendNativeToken symbol={data.symbol} />
        ) : (
          <Button onClick={() => switchNetwork?.(chain.id)}>
            <ChevronRightIcon width="16" height="16" />
            Switch
          </Button>
        )}
      </Table.Cell>
    </Table.Row>
  )
}

export default AssetRow
