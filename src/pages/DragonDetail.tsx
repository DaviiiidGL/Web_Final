import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchDragonDetail } from '../services/DragonService'
import type { Dragon } from '../services/DragonService'
import { useFavorites } from '../context/FavoritesContext'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

export default function DragonDetail() {
  const { name } = useParams()
  const [dragon, setDragon] = useState<Dragon | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    if (!name) return

    const decodedName = decodeURIComponent(name)

    setLoading(true)
    setError(null)

    fetchDragonDetail(`https://pokeapi.co/api/v2/pokemon/${decodedName.toLowerCase()}`)
      .then((data) => {
        setDragon(data)
        setLoading(false)
      })
      .catch(() => {
        setError('No se pudo cargar el detalle del dragón.')
        setLoading(false)
      })
  }, [name])

  const toggleFavorite = () => {
    if (!dragon) return

    if (isFavorite(dragon.name)) {
      removeFavorite(dragon.name)
    } else {
      addFavorite(dragon)
    }
  }

  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="p-4">
      <Link to="/" className="text-purple-400">← Volver</Link>

      {dragon && (
        <div className="mt-6 bg-gray-900 rounded-lg p-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-center items-start">
              <img
                src={dragon.image}
                alt={dragon.name}
                className="w-full max-w-sm rounded-lg shadow-lg"
              />
            </div>

            <div>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h1 className="text-red-100 font-serif text-4xl font-bold mb-2 dsa">{dragon.name}</h1>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {dragon.types.map((t) => (
                      <span
                        key={t}
                        className="bg-sky-950 px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={toggleFavorite}
                  className={`text-3xl transition-transform hover:scale-110 ${
                    isFavorite(dragon.name) ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                  aria-pressed={isFavorite(dragon.name)}
                >
                  ★
                </button>
              </div>

              <div className="mt-6 bg-gray-800 rounded-lg p-4">
                <h2 className="text-blue-100 text-2xl font-bold mb-4">Estadísticas</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">HP:</span>
                    <span className="text-green-700 text-lg">{dragon.stats.hp}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Ataque:</span>
                    <span className="text-red-700 text-lg">{dragon.stats.attack}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Defensa:</span>
                    <span className="text-blue-700 text-lg">{dragon.stats.defense}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gray-800 rounded-lg p-4">
                <h2 className="text-blue-100text-2xl font-bold mb-4">Habilidades</h2>
                <div className="flex flex-wrap gap-2">
                  {dragon.abilities.map((ability) => (
                    <span
                      key={ability}
                      className="bg-indigo-900 px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {ability}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}