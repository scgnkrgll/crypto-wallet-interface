"use client"

import { Box, Card, Flex, Heading } from "@radix-ui/themes"

import ConnectDialog from "./ConnectDialog"
import NotConnected from "./NotConnected"

const LandingConnectionCard = () => {
  return (
    <NotConnected>
      <Card variant="classic" size="4" style={{ minWidth: 300 }}>
        <Box height="7" mb="4">
          <Heading as="h3" size="4" mt="-1">
            Connect to use the application
          </Heading>
        </Box>
        <Flex justify="center">
          <ConnectDialog />
        </Flex>
      </Card>
    </NotConnected>
  )
}

export default LandingConnectionCard
