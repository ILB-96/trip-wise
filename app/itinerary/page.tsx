// pages/index.js
import Head from 'next/head';
import Image from 'next/image';

const days = [
  {
    day: 'Day 1',
    activities: [
      { name: 'Visit Tsukiji Fish Market', time: '9:00 AM' },
      { name: 'Explore Asakusa Senso-ji Temple', time: '11:00 AM' },
      { name: 'Enjoy traditional tea at a local tea house', time: '3:00 PM' },
    ],
  },
  {
    day: 'Day 2',
    activities: [
      { name: 'Visit the Imperial Palace Gardens', time: '10:30 AM' },
      { name: 'Explore Akihabara for electronics and anime', time: '1:00 PM' },
      { name: 'Try street food in Harajuku', time: '6:30 PM' },
    ],
  },
  // Add more days and activities as needed
];

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Itinerary Template | Tokyo | Travaa</title>
        {/* Other meta tags */}
      </Head>

      <main className="my-8">
        <h1 className="text-4xl font-bold text-center mb-4">Tokyo Itinerary</h1>
        <div className="flex justify-center mb-6">
          <Image src={""} alt="Tokyo" width={400} height={300} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {days.map((day) => (
            <div key={day.day} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{day.day}</h2>
              <ul className="list-disc pl-6">
                {day.activities
                  .sort((a, b) => a.time.localeCompare(b.time)) // Sort activities by time
                  .map((activity) => (
                    <li key={activity.name}>
                      {activity.name} ({activity.time})
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center my-8">
        {/* Footer content */}
      </footer>
    </div>
  );
}
