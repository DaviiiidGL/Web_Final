import DragonCard from './DragonCard'
import type { Dragon } from '../services/DragonService'

interface DragonListProps {
  dragons: Dragon[]
}

export default function DragonList({ dragons }: DragonListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dragons.map((dragon) => (
        <DragonCard
          key={dragon.name}
          dragon={dragon}
        />
      ))}
    </div>
  )
}