import Navbar from "@/components/navbar"
import HeroCarousel from "@/components/hero-carousel"
import EventsSection from "@/components/events-section"
import MembershipSection from "@/components/membership-section"
import DonationSection from "@/components/donation-section"
import BlogSection from "@/components/blog-section"
import MediaSection from "@/components/media-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"  
import Achievements from "@/components/achievements"
import VideoSection from "@/components/video-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroCarousel />
      <div className="container mx-auto px-4 py-8">
        <EventsSection />
        <Achievements />
        <MembershipSection />
        <DonationSection />
        <BlogSection />
        <MediaSection />
        <VideoSection />
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
