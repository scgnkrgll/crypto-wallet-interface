"use client"

import { CrossCircledIcon } from "@radix-ui/react-icons"
import { Callout, Table } from "@radix-ui/themes"

import { useChrBalanceOf, useChrSymbol } from "../../generated"
import { AssetRowProps } from "./types"

const CHRAssetRow = ({ address, chain }: AssetRowProps) => {
  const { data, isLoading: isLoadingBalance } = useChrBalanceOf({
    watch: true,
    args: [address],
    chainId: chain.id as 1 | 97,
  })

  const { data: symbol, isLoading: isLoadingSymbol } = useChrSymbol({
    chainId: chain.id as 1 | 97,
  })

  if (isLoadingBalance) return <>Loading Balance</>
  if (isLoadingSymbol) return <>Loading symbol</>

  if (data === undefined || !symbol)
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
      <Table.RowHeaderCell>
        CHR on {chain.id === 1 ? "mainnet" : "BSC Testnet"}
      </Table.RowHeaderCell>
      <Table.Cell>
        {data?.toString()} {symbol}
      </Table.Cell>
    </Table.Row>
  )
}

export default CHRAssetRow
