"use client"

import { CrossCircledIcon } from "@radix-ui/react-icons"
import { Callout, Table } from "@radix-ui/themes"
import { useBalance } from "wagmi"

import { AssetRowProps } from "./types"

const AssetRow = ({ address, chain }: AssetRowProps) => {
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
        {data.formatted} {data.symbol}
      </Table.Cell>
    </Table.Row>
  )
}

export default AssetRow
