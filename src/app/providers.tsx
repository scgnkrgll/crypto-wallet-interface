"use client"

import { Theme } from "@radix-ui/themes"
import { ThemeProvider } from "next-themes"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" forcedTheme="dark">
      <Theme panelBackground="translucent" accentColor="teal">
        {children}
      </Theme>
    </ThemeProvider>
  )
}

export default Providers
