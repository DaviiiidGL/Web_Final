import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons'
import { useFavorites } from '../context/FavoritesContext'

interface DragonCardProps {
  dragon: {
    name: string
    types: string[]
    image: string
  }
}

export default function DragonCard({ dragon }: DragonCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  const favorite = isFavorite(dragon.name)

  const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (favorite) {
      removeFavorite(dragon.name)
    } else {
      addFavorite(dragon)
    }
  }

  return (
    <article className="relative bg-sky-950 border border-purple-300 rounded-3xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-lg">
      <Link to={`/dragon/${encodeURIComponent(dragon.name)}`} className="block">
        <img
          src={dragon.image}
          alt={`Imagen del dragón ${dragon.name}`}
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          <h2 className="text-red-100 font-serif text-xl font-semibold">{dragon.name}</h2>
          <p className="mt-2 text-sm text-red-400">
            Tipo:{' '}
            <span className="font-medium text-red-200">
              {dragon.types?.[0] ?? 'Desconocido'}
            </span>
          </p>
        </div>
      </Link>

      <button
        type="button"
        onClick={handleFavoriteClick}
        className={`relative z-10 flex items-center justify-center gap-2 w-full px-4 py-3 border-t border-slate-200 text-sm font-semibold transition-colors duration-200 ${
          favorite
            ? 'text-amber-500 hover:text-amber-600'
            : 'text-slate-500 hover:text-yellow-400'
        }`}
        aria-pressed={favorite}
      >
        <FontAwesomeIcon
          icon={faSolidStar}
          className={favorite ? 'text-amber-400' : 'text-slate-400'}
        />
        {favorite ? 'Favorito' : 'Agregar a favoritos'}
      </button>
    </article>
  )
}