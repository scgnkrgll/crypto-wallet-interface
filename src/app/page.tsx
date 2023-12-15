import AssetsTable from "@/components/AssetsTable"
import BackgroundContainer from "@/components/BackgroundContainer"
import Connected from "@/components/Connected"
import DisconnectButton from "@/components/DisconnectButton"
import LandingConnectionCard from "@/components/LandingConnectionCard"
import NetworkGuard from "@/components/NetworkGuard"

const Home = () => {
  return (
    <BackgroundContainer>
      <NetworkGuard>
        <Connected>
          <AssetsTable />
        </Connected>
      </NetworkGuard>
      <LandingConnectionCard />
      <DisconnectButton />
    </BackgroundContainer>
  )
}

export default Home
