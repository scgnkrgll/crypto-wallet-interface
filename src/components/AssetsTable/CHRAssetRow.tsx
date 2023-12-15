"use client"

import { ChevronRightIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { Button, Callout, Table } from "@radix-ui/themes"
import { useNetwork, useSwitchNetwork } from "wagmi"

import formatChr from "@/utils/formatChr"

import { useChrBalanceOf, useChrSymbol } from "../../generated"
import { SendChr } from "../SendChr"
import { AssetRowProps } from "./types"

const CHRAssetRow = ({ address, chain }: AssetRowProps) => {
  const { chain: activeChain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

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
        {parseFloat(formatChr(data)).toFixed(4)} {symbol}
      </Table.Cell>
      <Table.Cell>
        {activeChain?.id === chain.id ? (
          <SendChr symbol={symbol} />
        ) : (
          <Button onClick={() => switchNetwork?.(chain.id)}>
            <ChevronRightIcon width="16" height="16" /> Switch
          </Button>
        )}
      </Table.Cell>
    </Table.Row>
  )
}

export default CHRAssetRow
