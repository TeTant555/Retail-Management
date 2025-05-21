import AboutPage from "@/components/About-Page";
import { Footer } from "@/components/footer";

const About = () => {
  return (
    <div className="flex justify-center max-h-screen overflow-auto">
      <div>
        <AboutPage />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default About