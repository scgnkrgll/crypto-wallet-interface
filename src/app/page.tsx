import BackgroundContainer from "@/components/BackgroundContainer"
import DisconnectButton from "@/components/DisconnectButton"
import LandingConnectionCard from "@/components/LandingConnectionCard"

const Home = () => {
  return (
    <BackgroundContainer>
      <LandingConnectionCard />
      <DisconnectButton />
    </BackgroundContainer>
  )
}

export default Home
