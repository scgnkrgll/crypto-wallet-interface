"use client"

import { Theme } from "@radix-ui/themes"
import { ThemeProvider } from "next-themes"
import { useEffect, useState } from "react"
import { WagmiConfig } from "wagmi"

import { ToastProvider } from "../components/Toast"
import config from "../wagmi"

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <ThemeProvider attribute="class" forcedTheme="dark">
      <Theme panelBackground="translucent" accentColor="teal">
        <ToastProvider
          options={{
            duration: 3000,
          }}
        >
          <WagmiConfig config={config}>{mounted && children}</WagmiConfig>
        </ToastProvider>
      </Theme>
    </ThemeProvider>
  )
}

export default Providers
