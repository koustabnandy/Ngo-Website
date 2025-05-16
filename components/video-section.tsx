import Link from "next/link";
import { Play } from "lucide-react";

// Helper function to extract YouTube video ID
function extractYouTubeID(url: string) {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^\s&]+)/);
  return match ? match[1] : null;
}

export default function VideoSection() {
  const channelUrl = "https://www.youtube.com/@nirvritifoundation9701";

  const videos = [
    {
      title: "Autism and General Awareness || Dr. Mallika Banerjee || World Autism Day ||",
      url: "https://www.youtube.com/watch?v=a3Jmv3sVvw8",
    },
    {
      title: "International Women's Day || Online meet",
      url: "https://www.youtube.com/watch?v=UIjhGLR8AAE",
    },
    {
      title: "Beach Cleaning Activity | #chandipur | Review from Students",
      url: "https://www.youtube.com/watch?v=nVxdqqMFaSU",
    },
  ];

  return (
    <section id="videos" className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12">
          OUR <span className="text-yellow-500">Videos</span>
        </h2>

        <p className="text-blue-900 text-lg mb-10 max-w-3xl mx-auto">
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
          {videos.map((video, index) => {
            const videoId = extractYouTubeID(video.url);
            const thumbnailUrl = videoId
              ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              : "/placeholder.jpg"; // fallback if ID can't be extracted

            return (
              <a
                key={index}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-blue-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative group cursor-pointer">
                    <img
                      src={thumbnailUrl}
                      alt={video.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all">
                      <Play className="h-16 w-16 text-yellow-500 opacity-90 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold">{video.title}</h3>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-8">
          <Link
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 hover:text-yellow-400 underline font-medium"
          >
            Visit our YouTube channel for more videos
          </Link>
        </div>
      </div>
    </section>
  );
}
