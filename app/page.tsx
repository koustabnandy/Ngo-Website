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
import VolunteerRegistration from "@/components/volunteer-registration"
import FAQSection from "@/components/faq-section"
import SocialMediaFeed from "@/components/social-media-feed"


import ParallaxSection from "@/components/parallax-section"
import TiltCard from "@/components/tilt-card"
import AnimatedText from "@/components/animated-text"
import CursorEffect from "@/components/cursor-effect"
import GridBackground from "@/components/grid-background"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 relative">
      {/* Futuristic cursor effect */}
      <CursorEffect />
      
      {/* Grid background for futuristic feel */}
      <GridBackground className="fixed inset-0 -z-10" />
      
      <Navbar />
      
      {/* Hero section with enhanced animations */}
      <div className="relative">
        <HeroCarousel />
        {/* Hero text removed as requested */}
      </div>
      
      {/* What We Do section with parallax */}
      <ParallaxSection direction="up" speed={0.3} className="relative z-10">
        <WhatWeDo />
      </ParallaxSection>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Events section with tilt cards */}
        <div className="my-20">
          <EventsSection />
        </div>
        
        {/* Achievements with parallax */}
        <ParallaxSection direction="right" speed={0.2} className="my-20">
          <div className="neo-card p-8">
            <Achievements />
          </div>
        </ParallaxSection>
      </div> 

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Membership section with glass effect */}
        <div className="my-20 glass-effect p-8 rounded-2xl">
          <MembershipSection />
        </div>
      </div>
      
      {/* Volunteer section with tilt effect */}
      <div className="my-20">
        <TiltCard className="max-w-7xl mx-auto">
          <div className="gradient-border">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl">
              <VolunteerRegistration />
            </div>
          </div>
        </TiltCard>
      </div>
      
      {/* Donation section with parallax */}
      <ParallaxSection direction="up" speed={0.4} className="my-20">
        <DonationSection />
      </ParallaxSection>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Media section with morphing shapes */}
        <div className="my-20">
          <div className="animate-morph-shape overflow-hidden">
            <MediaSection />
          </div>
        </div>
        
        {/* Video section with floating animation */}
        <div className="my-20 animate-float-glow">
          <VideoSection />
        </div>
      </div>
      
      {/* Social media feed with glass effect */}
      <div className="my-20 glass-effect mx-4 sm:mx-8 lg:mx-auto max-w-7xl p-8 rounded-2xl">
        <SocialMediaFeed />
      </div>
      
      {/* FAQ section */}
      <div className="my-20">
        <FAQSection />
      </div>
      
      {/* We Pledge section with parallax */}
      <ParallaxSection direction="left" speed={0.3} className="my-20">
        <div className="neo-card mx-4 sm:mx-8 lg:mx-auto max-w-7xl p-8">
          <WePledge />
        </div>
      </ParallaxSection>
      
      {/* Members section with tilt effect */}
      <TiltCard className="max-w-7xl mx-auto my-20">
        <MembersSection />
      </TiltCard>
      
      {/* Contact section with glass effect */}
      <div className="glass-effect mx-4 sm:mx-8 lg:mx-auto max-w-7xl p-8 rounded-2xl my-20">
        <ContactSection />
      </div>
      
      <Footer />
      <AccessibilityWidget />
      <ScrollToTop />
    </main>
  )
}
