"use client"
import Image from "next/image"
import { Card } from "@/components/ui/card"

type MemberType = {
  name: string
  role: string
}

export default function MembersSection() {
  const committeeMembers: MemberType[] = [
    { name: "PARTHA MUKHOPADHYAY", role: "President" },
    { name: "ANAMIKA GUPTA", role: "Treasurer" },
    { name: "SWARUP CHANRA CHANDA", role: "Secretary" },
    { name: "DEBAADITYA MUKHOPADHYAY", role: "Vice-President" },
    { name: "SUBHADEEP PAUL", role: "Assistant-Secretary" },
  ]

  const regularMembers: MemberType[] = [
    { name: "PRADIP PAUL", role: "Member" },
    { name: "SAYAN MUKHERJEE", role: "Member" },
    { name: "JAYATI MUKHERJEE", role: "Member" },
    { name: "DOLA ROYCHOWDHURY", role: "Member" },
    { name: "OINDRILA BANIK", role: "Member" },
    { name: "PRATICHI PANTI", role: "Member" },
    { name: "AYUSHI ROYCHOWDHURY", role: "Member" },
  ]

  return (
    <div id="members" className="py-16 bg-blue-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-blue-400 mb-12">
          NIRVRITI <span className="text-yellow-500">COMMITTEE</span>
        </h1>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-center text-blue-700 dark:text-blue-300 mb-8">
            Committee Members
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {committeeMembers.map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-center text-blue-700 dark:text-blue-300 mb-8">Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {regularMembers.map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MemberCard({ member }: { member: MemberType }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-gray-700">
      <div className="aspect-square relative">
        <Image
          src={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(member.name)}`}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-bold text-blue-700 dark:text-blue-300">{member.name}</h3>
        <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
      </div>
    </Card>
  )
}
