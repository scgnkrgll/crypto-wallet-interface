"use client"

import { useState } from "react"
import { useDebounce } from "use-debounce"
import { BaseError } from "viem"
import { isAddress, parseEther } from "viem"
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi"

import SendDialog from "./SendDialog"
import { useToast } from "./Toast/Toast"

interface SendNativeTokenProps {
  symbol: string
}

export const SendNativeToken = ({ symbol }: SendNativeTokenProps) => {
  const toast = useToast()

  const [to, setTo] = useState("")
  const [debouncedTo] = useDebounce(isAddress(to) ? to : undefined, 500)

  const [amount, setAmount] = useState("")

  const [debouncedAmount] = useDebounce(amount, 500)

  const { config, error } = usePrepareSendTransaction({
    to: debouncedTo,
    value: debouncedAmount
      ? parseEther(debouncedAmount as `${number}`)
      : undefined,
    enabled: Boolean(debouncedTo && debouncedAmount),
    onError(error) {
      if (error.name === "EstimateGasExecutionError") return
      toast({
        description: (error as BaseError).shortMessage ?? error.message,
        variant: "error",
      })
    },
  })
  const { data, sendTransaction, isLoading } = useSendTransaction({
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
      sendTransaction={sendTransaction}
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
