import Link from "next/link"
import { Play } from "lucide-react"

export default function VideoSection() {
  const channelUrl = "https://www.youtube.com/@nirvritifoundation9701"

  return (
    <section id="videos" className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-8">OUR VIDEOS</h2>

        <p className="text-white text-lg mb-10 max-w-3xl mx-auto">
          Watch our impactful journey and see how we're making a difference in the lives of people. Subscribe to our
          channel to stay updated with our latest activities.
        </p>

        <div className="flex justify-center">
          <Link
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
          >
            <Play className="h-5 w-5" />
            Watch Our Videos
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured video thumbnails - these would be replaced with actual video embeds */}
          <div className="bg-blue-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="aspect-video bg-gray-800 relative group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="h-16 w-16 text-yellow-500 opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold">Community Outreach Program</h3>
            </div>
          </div>

          <div className="bg-blue-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="aspect-video bg-gray-800 relative group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="h-16 w-16 text-yellow-500 opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold">Educational Support Initiative</h3>
            </div>
          </div>

          <div className="bg-blue-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="aspect-video bg-gray-800 relative group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="h-16 w-16 text-yellow-500 opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold">Health and Hygiene Campaign</h3>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:text-yellow-300 underline font-medium"
          >
            Visit our YouTube channel for more videos
          </Link>
        </div>
      </div>
    </section>
  )
}
