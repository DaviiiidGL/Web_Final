import { createContext, useContext, useState} from 'react'
import type { ReactNode } from 'react' 

interface Dragon {
  name: string
  [key: string]: any
}

const FavoritesContext = createContext<{
  favorites: Dragon[]
  addFavorite: (dragon: Dragon) => void
  removeFavorite: (dragonName: string) => void
  isFavorite: (dragonName: string) => boolean
} | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Dragon[]>([])

  const addFavorite = (dragon: Dragon) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.name === dragon.name)) {
        return prevFavorites
      }
      return [...prevFavorites, dragon]
    })
  }

  const removeFavorite = (dragonName: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.name !== dragonName)
    )
  }

  const isFavorite = (dragonName: string): boolean => {
    return favorites.some((fav) => fav.name === dragonName)
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider')
  }
  return context
}