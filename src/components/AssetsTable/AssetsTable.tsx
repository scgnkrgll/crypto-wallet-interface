"use client"

import { Table } from "@radix-ui/themes"
import { useAccount, useNetwork } from "wagmi"

import AssetRow from "./AssetRow"

const AssetsTable = () => {
  const { address } = useAccount()
  const { chains } = useNetwork()

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Chain</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {chains.map((chain) => (
          <AssetRow key={chain.id} chain={chain} address={address!} />
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default AssetsTable