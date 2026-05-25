import DragonList from '../components/DragonList'
import EmptyState from '../components/EmptyState'
import { useFavorites } from '../context/FavoritesContext'

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold text-amber-400">Tus favoritos</h2>
      {favorites.length === 0 ? <EmptyState /> : <DragonList dragons={favorites} />}
    </div>
  )
}