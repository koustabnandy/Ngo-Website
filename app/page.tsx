// c:/Users/rajde/OneDrive/Desktop/Frontend/ngo/Ngo-Website/app/page.tsx

import Navbar from "@/components/navbar"
import HeroCarousel from "@/components/hero-carousel"
import WhatWeDo from "@/components/what-we-do"
import EventsSection from "@/components/events-section"
import MembershipSection from "@/components/membership-section"
import DonationSection from "@/components/donation-section"
import MediaSection from "@/components/media-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"  
import Achievements from "@/components/achievements"
import VideoSection from "@/components/video-section"
import ScrollToTop from "@/components/scroll-to-top"

import TestimonialsSection from "@/components/testimonials"
import AccessibilityWidget from "@/components/accessibility-widget"
import WePledge from "@/components/we-pledge"
import MembersSection from "@/components/members-section"

// New components
import DonationTracker from "@/components/donation-tracker"
import VolunteerRegistration from "@/components/volunteer-registration"


import FAQSection from "@/components/faq-section"
import SocialMediaFeed from "@/components/social-media-feed"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <HeroCarousel />
      
      <WhatWeDo />
      
      <div className="my-20">
        <DonationTracker />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-20">
          <EventsSection />
        </div>
        
        <div className="my-20">
          <Achievements />
        </div>
      </div> 
      


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-20">
          <MembershipSection />
        </div>
      </div>
      
      <div className="my-20">
        <VolunteerRegistration />
      </div>
      
      <div className="my-20">
        <DonationSection />
      </div>
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-20">
          <MediaSection />
        </div>
        
        <div className="my-20">
          <VideoSection />
        </div>
      </div>
      
      <div className="my-20">
        <SocialMediaFeed />
      </div>
      
      <div className="my-20">
        <FAQSection />
      </div>
      
      <div className="my-20">
        <WePledge />
      </div>
      
      <MembersSection />
      <ContactSection />
      
      <Footer />
      <AccessibilityWidget />
      <ScrollToTop />
    </main>
  )
}
