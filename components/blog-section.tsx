import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, User, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Empowering Education: Our Journey in Haridevpur",
    excerpt:
      "Learn about our educational initiatives and how they're making a difference in the lives of students in Haridevpur.",
    date: "April 10, 2023",
    author: "Priya Sharma",
    image: "/placeholder.svg?height=300&width=500",
    slug: "empowering-education",
  },
  {
    id: 2,
    title: "Community Health Initiatives: A Year in Review",
    excerpt: "A comprehensive look at our health programs and their impact on the local community over the past year.",
    date: "March 22, 2023",
    author: "Rahul Gupta",
    image: "/placeholder.svg?height=300&width=500",
    slug: "community-health-initiatives",
  },
  {
    id: 3,
    title: "Volunteer Spotlight: Meet Our Dedicated Team",
    excerpt:
      "Get to know the passionate volunteers who make our mission possible through their dedication and hard work.",
    date: "February 15, 2023",
    author: "Ananya Das",
    image: "/placeholder.svg?height=300&width=500",
    slug: "volunteer-spotlight",
  },
]

const BlogSection = () => {
  return (
    <section id="blog" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Our Blog</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay updated with our latest news, stories, and insights from our work in the community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden border-green-100 transition-all duration-300 hover:shadow-lg h-full flex flex-col"
          >
            <div className="relative h-48 w-full">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
            <CardHeader>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                <span className="flex items-center gap-1">
                  <CalendarDays size={14} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <User size={14} />
                  {post.author}
                </span>
              </div>
              <CardTitle className="text-xl text-green-700">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-600">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full border-green-200 text-green-700 hover:bg-green-50 transition-all duration-300 group"
                asChild
              >
                <a href={`/blog/${post.slug}`}>
                  Read More
                  <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-10">
        <Button
          className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105"
          asChild
        >
          <a href="/blog">View All Posts</a>
        </Button>
      </div>
    </section>
  )
}

export default BlogSection
