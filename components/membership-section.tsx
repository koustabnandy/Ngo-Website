import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const benefits = [
  "Participate in exclusive volunteer opportunities",
  "Receive regular updates about our initiatives",
  "Network with like-minded individuals",
  "Contribute to decision-making processes",
  "Access to members-only events and workshops",
  "Certificate of membership and recognition",
]

const MembershipSection = () => {
  return (
    <section id="membership" className="py-16 bg-blue-50 rounded-xl my-16 p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12">
          Become a <span className="text-yellow-500">Member</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join our community of passionate individuals dedicated to making a positive impact in society.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <Card className="border-green-100 bg-white/80 backdrop-blur-sm shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">Membership Benefits</CardTitle>
              <CardDescription>
                As a member of Nirvrti Foundation, you'll enjoy these exclusive benefits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-yellow-500 hover:bg-yellow-300 text-white transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <a href="https://forms.google.com/membership-form" target="_blank" rel="noopener noreferrer">
                  Register Now
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="flex-1 bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-md border border-green-100">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">Why Join Us?</h3>
          <p className="text-gray-700 mb-6">
            At Nirvrti Foundation, we believe in the power of collective action. By becoming a member, you're not just
            joining an organization; you're becoming part of a family dedicated to creating meaningful change in our
            community.
          </p>
          <p className="text-gray-700 mb-6">
            Our members come from diverse backgrounds but share a common goal: to make a positive impact in the lives of
            those in need. Whether you can contribute your time, skills, or resources, there's a place for you in our
            community.
          </p>
          <p className="text-gray-700">
            Membership is open to all individuals aged 18 and above who share our vision and values. Join us today and
            be a catalyst for positive change!
          </p>
        </div>
      </div>
    </section>
  )
}

export default MembershipSection
