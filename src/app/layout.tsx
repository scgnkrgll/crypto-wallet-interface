import "./globals.css"
import "@radix-ui/themes/styles.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import Providers from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Crypto Wallet Interface",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
