import FeaturesSection from "@/components/FeatureSection"
import NewArrival from "@/components/NewArrival"
import { Hero1 } from "@/components/hero"
import Shopping from "@/assets/shopping.jpg" // Import the image
import { Footer } from "@/components/footer"

const Home = () => {
    return (
        <>
            <div>
                <Hero1
                    heading="Welcome to Our Online Shoping Store"
                    description="Discover the latest arrivals and exclusive features."
                    image={{
                        src: Shopping,
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