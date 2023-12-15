"use client"
import * as Toast from "@radix-ui/react-toast"
import { Callout, Text } from "@radix-ui/themes"
import { createContext, ReactNode, useContext, useState } from "react"

import styles from "./toast.module.css"

type Variant = "info" | "success" | "error"

interface ToastParameters {
  title?: ReactNode
  description?: ReactNode
  variant?: Variant
}

type ToastContext = (parameters: ToastParameters) => void

const ToastContext = createContext<ToastContext>(() => {})

type ToastRootColor = React.ComponentProps<typeof Callout.Root>["color"]

const colorMap: Record<Variant, ToastRootColor> = {
  info: "blue",
  success: "green",
  error: "tomato",
}

interface ToastProviderProps {
  children: ReactNode
  options: {
    duration: number
  }
}

export const ToastProvider = ({ children, options }: ToastProviderProps) => {
  const [open, setOpen] = useState(false)

  const [toastParameters, setToastParameters] =
    useState<ToastParameters | null>(null)

  function toast(toastParameters: ToastParameters) {
    setToastParameters(toastParameters)
    setOpen(true)
  }

  return (
    <ToastContext.Provider value={toast}>
      <Toast.Provider>
        <Toast.Root
          duration={options.duration}
          className={styles.toastRoot}
          open={open}
          onOpenChange={setOpen}
        >
          <Callout.Root
            variant="surface"
            color={colorMap[toastParameters?.variant || "info"]}
          >
            <Callout.Text>
              {toastParameters?.title && (
                <Text weight="bold" mb="1">
                  {toastParameters?.title}
                  <br />
                </Text>
              )}
              {toastParameters?.description}
            </Callout.Text>
          </Callout.Root>
        </Toast.Root>
        <Toast.Viewport className={styles.toastViewport} />
      </Toast.Provider>

      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
