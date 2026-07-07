import { useState } from 'react'
import HeroSection from './components/HeroSection'
import TripPlanner from './components/TripPlanner'
import Itinerary from './components/Itinerary'
import HotelComparisonSection from './components/HotelComparison'
import RestaurantComparisonSection from './components/RestaurantComparison'
import { destinations, DestinationInfo } from './data/places'

export default function App() {
  const [selectedDest, setSelectedDest] = useState<DestinationInfo>(destinations[0])

  const handleDestChange = (dest: DestinationInfo) => {
    setSelectedDest(dest)
    setTimeout(() => {
      document.getElementById('itinerary')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />

      {/* Pass a callback so TripPlanner can notify App when destination changes */}
      <TripPlannerAdapter onDestChange={handleDestChange} />

      <Itinerary dest={selectedDest} />
      <HotelComparisonSection comparisons={selectedDest.hotelComparisons} />
      <RestaurantComparisonSection comparisons={selectedDest.restaurantComparisons} />

      {/* Footer */}
      <footer className="py-8 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl">
            Aethera<sup className="text-xs">®</sup>
            <span className="ml-3 text-sm font-body text-white/60">Travel Planning</span>
          </div>
          <p className="text-sm font-body text-white/60">
            © 2026 Aethera. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}

// Adapter component that ties TripPlanner destination selection to App state
function TripPlannerAdapter({ onDestChange }: { onDestChange: (d: DestinationInfo) => void }) {
  return (
    <div>
      <TripPlanner
        onDestChange={(destId: string) => {
          const dest = destinations.find((d) => d.id === destId)
          if (dest) onDestChange(dest)
        }}
      />
    </div>
  )
}
