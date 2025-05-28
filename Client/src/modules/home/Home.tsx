import FeaturesSection from "@/modules/home/chunks/FeatureSection"
import NewArrival from "@/modules/home/chunks/NewArrival"
import { Hero } from "@/modules/home/chunks/Hero"
import Poster from "@/assets/shopping.jpg" // Import the image
import { Footer } from "@/components/footer"

const Home = () => {

    return (
        <>
            <div>
                <Hero
                    heading="Welcome to Our Online Shoping Store"
                    description="Discover the latest arrivals and exclusive features."
                    image={{
                        src: Poster,
                        alt: "Shopping image",
                    }}
                    // Add other required props like 'badge' and 'buttons' if needed
                />
            </div>
            <div>
                <NewArrival />
            </div>
            <div>
                <FeaturesSection />
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Home