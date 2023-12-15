"use client"

import { Theme } from "@radix-ui/themes"
import { ThemeProvider } from "next-themes"
import { useEffect, useState } from "react"
import { WagmiConfig } from "wagmi"

import config from "../wagmi"

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <ThemeProvider attribute="class" forcedTheme="dark">
      <Theme panelBackground="translucent" accentColor="teal">
        <WagmiConfig config={config}>{mounted && children}</WagmiConfig>
      </Theme>
    </ThemeProvider>
  )
}

export default Providers
