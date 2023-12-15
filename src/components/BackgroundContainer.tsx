import { Flex } from "@radix-ui/themes"

import PanelBackgroundImage from "./PanelBackgroundImage"

const BackgroundContainer = ({ children }: { children: React.ReactNode }) => (
  <Flex
    justify="center"
    position="relative"
    align="center"
    direction="column"
    gap="4"
    p="4"
    style={{ height: "100vh" }}
  >
    <Flex
      align="center"
      justify="center"
      position="absolute"
      inset="0"
      style={{ overflow: "hidden", zIndex: -1 }}
    >
      <PanelBackgroundImage id="1" width="100%" height="200%" />
    </Flex>
    {children}
  </Flex>
)

export default BackgroundContainer
