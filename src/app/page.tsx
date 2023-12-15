import { Flex } from "@radix-ui/themes"

import DisconnectButton from "@/components/DisconnectButton"
import LandingConnectionCard from "@/components/LandingConnectionCard"

const Home = () => {
  return (
    <Flex
      justify="center"
      position="relative"
      align="center"
      direction="column"
      gap="4"
      style={{ height: "100vh" }}
    >
      <LandingConnectionCard />
      <DisconnectButton />
    </Flex>
  )
}

export default Home
