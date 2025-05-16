const achievements = [
  { id: 1, text: "Distributed 3000+ Sanitary Napkins" },
  { id: 2, text: "Distributed 10000+ Old Clothes" },
  { id: 3, text: "Distributed 5000+ New Sarees" },
  { id: 4, text: "Distributed 5000+ New T-Shirts for Kids" },
  { id: 5, text: "Provided 20000+ Meals for the underprivileged" },
  { id: 6, text: "Distributed 1000+ Dry Rations to old age homes" },
  { id: 7, text: "Planted 100+ Trees" },
  { id: 8, text: "Delivered 15000+ Educational Kits" },
]

export default function Achievements() {
  return (
    <section id="achievements" className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12">
          OUR <span className="text-yellow-500">ACHIEVEMENTS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 border-l-4 border-yellow-500"
            >
              <p className="text-lg font-semibold text-blue-700">{achievement.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
