"use client"

import { Table } from "@radix-ui/themes"
import { bscTestnet } from "viem/chains"
import { mainnet, useAccount, useNetwork } from "wagmi"

import Connected from "../Connected"
import AssetRow from "./AssetRow"
import CHRAssetRow from "./CHRAssetRow"

const AssetsTable = () => {
  const { address } = useAccount()
  const { chains } = useNetwork()

  return (
    <Connected>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Chain</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {chains.map((chain) => (
            <AssetRow key={chain.id} chain={chain} address={address!} />
          ))}
          {[mainnet, bscTestnet].map((chain) => (
            <CHRAssetRow key={chain.id} chain={chain} address={address!} />
          ))}
        </Table.Body>
      </Table.Root>
    </Connected>
  )
}

export default AssetsTable
