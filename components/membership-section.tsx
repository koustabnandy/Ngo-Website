import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
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
    <section id="membership" className="py-16 bg-blue-50 dark:bg-gray-900 rounded-xl my-16 p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-blue-400 mb-12">
          Become a <span className="text-yellow-500 dark:text-yellow-400">Member</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Join our community of passionate individuals dedicated to making a positive impact in society.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <Card className="border-green-100 dark:border-green-900 bg-white/80 dark:bg-gray-800 backdrop-blur-sm shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700 dark:text-blue-400">Membership Benefits</CardTitle>
              <CardDescription className="dark:text-gray-300">
                As a member of NIRVRITI Foundation, you'll enjoy these exclusive benefits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check size={20} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
  className="w-full bg-yellow-500 hover:bg-yellow-300 text-white transition-all duration-300 transform hover:scale-105"
  asChild
>
  <a
    href="https://forms.gle/Cnh9qKxuzM8ACqhJ8"
    target="_blank"
    rel="noopener noreferrer"
  >
    Fill the form!
  </a>
</Button>

            </CardFooter>
          </Card>
        </div>

        <div className="flex-1">
  <Card className="border-green-100 bg-white/80 backdrop-blur-sm shadow-md">
    <CardHeader>
      <CardTitle className="text-2xl text-blue-700">Membership Form (Download or Fill)</CardTitle>
      <CardDescription>
        Click the button below to open or download the fillable membership form PDF. You can fill it out digitally
        and email it to us at <strong>haridevpurnirvritifoundation20@gmail.com</strong>.
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-4">
      {/* Button Row */}
      <div className="flex gap-4">
        {/* View PDF Button */}
        <Button
          className="bg-blue-600 hover:bg-yellow-300 text-white transition-all duration-300"
          asChild
        >
          <a
            href="/Nirvriti_Membership_Fillable.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View PDF Form
          </a>
        </Button>

        {/* Download PDF Button */}
        <Button
          className="bg-yellow-400 hover:bg-blue-500 text-white transition-all duration-300"
          asChild
        >
          <a
            href="/Nirvriti_Membership_Fillable.pdf"
            download
          >
            Download PDF Form
          </a>
        </Button>
      </div>

      {/* Embedded PDF Viewer */}
      <object
        data="/Nirvriti_Membership_Fillable.pdf"
        type="application/pdf"
        width="100%"
        height="500px"
        className="rounded border"
      >
        <p className="text-gray-700">
          Your browser does not support embedded PDFs. You can{" "}
          <a
            href="/Nirvriti_Membership_Fillable.pdf"
            download
            className="text-blue-700 underline"
          >
            download the form here.
          </a>
        </p>
      </object>
    </CardContent>
  </Card>
</div>

      </div>
    </section>
  )
}

export default MembershipSection
