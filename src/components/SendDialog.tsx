"use client"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"
import {
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  Text,
  TextFieldInput,
} from "@radix-ui/themes"
import { Dispatch, SetStateAction, useState } from "react"
import { isAddress } from "viem"

interface SendDialogProps {
  sendTransaction?: () => void
  error: Error | null
  symbol: string
  to: string
  setTo: Dispatch<SetStateAction<string>>
  amount: string
  setAmount: Dispatch<SetStateAction<string>>
  isSending: boolean
  isLoading: boolean
}

const SendDialog = ({
  sendTransaction,
  symbol,
  error,
  to,
  setTo,
  amount,
  setAmount,
  isSending,
  isLoading,
}: SendDialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button color="tomato">
          <ArrowTopRightIcon width="16" height="16" /> Send
        </Button>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendTransaction?.()
          }}
        >
          <Box height="7" mb="4">
            <Heading as="h3" size="6" mt="-1">
              Send {symbol}
            </Heading>
          </Box>

          <Box mb="5">
            <label>
              <Text as="div" size="2" weight="medium" mb="2">
                Recipient
              </Text>
              <TextFieldInput
                variant="classic"
                disabled={isSending || isLoading}
                onChange={(e) => setTo(e.target.value)}
                placeholder="0xA0Cf…251e"
                value={to}
              />
            </label>
            {!isAddress(to) && (
              <Text color="tomato" size="1">
                Please enter a valid address
              </Text>
            )}
          </Box>
          <Box mb="5">
            <label>
              <Text as="div" size="2" weight="medium" mb="2">
                Amount
              </Text>
              <TextFieldInput
                variant="classic"
                type="number"
                disabled={isSending || isLoading}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.05"
                value={amount}
              />
            </label>
            {error?.name === "EstimateGasExecutionError" && (
              <Text color="tomato" size="1">
                You don&apos;t have sufficient fund
              </Text>
            )}
          </Box>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>

            <Button
              type="submit"
              color="tomato"
              disabled={
                isSending || isLoading || !sendTransaction || !to || !amount
              }
            >
              <ArrowTopRightIcon width="16" height="16" />{" "}
              {isSending ? "Sending" : "Send"}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default SendDialog
