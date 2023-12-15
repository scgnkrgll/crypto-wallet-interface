"use client"

import { useState } from "react"
import { useDebounce } from "use-debounce"
import { BaseError } from "viem"
import { isAddress } from "viem"
import { useWaitForTransaction } from "wagmi"

import parseChr from "@/utils/parseChr"

import { useChrTransfer, usePrepareChrTransfer } from "../generated"
import SendDialog from "./SendDialog"
import { useToast } from "./Toast/Toast"

interface SendCHRProps {
  symbol: string
}

export const SendChr = ({ symbol }: SendCHRProps) => {
  const toast = useToast()

  const [to, setTo] = useState("")
  const [debouncedTo] = useDebounce(isAddress(to) ? to : undefined, 500)

  const [amount, setAmount] = useState("")

  const [debouncedAmount] = useDebounce(amount, 500)

  const { config, error } = usePrepareChrTransfer({
    args:
      debouncedTo && debouncedAmount
        ? [debouncedTo, parseChr(debouncedAmount as `${number}`)]
        : undefined,
    enabled: Boolean(debouncedTo && debouncedAmount),
    onError(error) {
      toast({
        description: (error as BaseError).shortMessage ?? error.message,
        variant: "error",
      })
    },
  })

  const { data, write, isLoading } = useChrTransfer({
    ...config,
    onError(error) {
      toast({
        description: (error as BaseError)?.shortMessage ?? error.message,
        variant: "error",
      })
    },
  })

  const { isLoading: isSending } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      toast({
        description: `Sent successfully`,
        variant: "success",
      })
    },
  })

  return (
    <SendDialog
      sendTransaction={write}
      error={error}
      symbol={symbol}
      to={to}
      setTo={setTo}
      amount={amount}
      setAmount={setAmount}
      isSending={isSending}
      isLoading={isLoading}
    />
  )
}
