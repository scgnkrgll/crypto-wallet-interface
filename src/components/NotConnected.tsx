"use client"

import type { ReactNode } from "react"
import { useAccount } from "wagmi"

const NotConnected = ({ children }: { children: ReactNode }) => {
  const { isConnected } = useAccount()

  if (isConnected) return null
  return <>{children}</>
}

export default NotConnected
