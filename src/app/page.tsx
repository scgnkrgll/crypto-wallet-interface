import AssetsTable from "@/components/AssetsTable"
import BackgroundContainer from "@/components/BackgroundContainer"
import Connected from "@/components/Connected"
import DisconnectButton from "@/components/DisconnectButton"
import LandingConnectionCard from "@/components/LandingConnectionCard"

const Home = () => {
  return (
    <BackgroundContainer>
      <Connected>
        <AssetsTable />
      </Connected>
      <LandingConnectionCard />
      <DisconnectButton />
    </BackgroundContainer>
  )
}

export default Home
