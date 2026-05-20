import Hero from "@/components/home/Hero";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import WhySection from "@/components/home/WhySection";
import Testimonials from "@/components/home/Testimonials";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedRooms />
        <WhySection />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
