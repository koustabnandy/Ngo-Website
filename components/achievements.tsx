const achievements = [
  { id: 1, text: "Distributed\n3000+\nSanitary Napkins" },
  { id: 2, text: "Distributed\n10000+\nOld Clothes" },
  { id: 3, text: "Distributed\n5000+\nNew Sarees" },
  { id: 4, text: "Distributed\n5000+\nNew T-Shirts for Kids" },
  { id: 5, text: "Provided\n20000+\nMeals for the underprivileged" },
  { id: 6, text: "Distributed\n1000+\nDry Rations to old age homes" },
  { id: 7, text: "Planted\n100+\nTrees" },
  { id: 8, text: "Delivered\n15000+\nEducational Kits" },
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
              <p className="text-lg font-semibold text-blue-700 whitespace-pre-line">
                {achievement.text.split('\n').map((part, index) => {
                  // Check if the part is a number (possibly followed by a + sign)
                  if (/^\d+\+?$/.test(part)) {
                    return (
                      <span key={index} className="text-3xl font-black text-yellow-500 block transform hover:scale-110 transition-transform duration-300 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                        {part}
                      </span>
                    );
                  }
                  return <span key={index} className="block">{part}</span>;
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
