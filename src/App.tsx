import { Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import DragonDetail from './pages/DragonDetail'
import { FavoritesProvider } from './context/FavoritesContext'
import './App.css'

function App() {
  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800 bg-slate-900/90 px-4 py-4 backdrop-blur-sm md:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-violet-500">DragON</h1>
              <p className="mt-1 text-sm text-slate-400">
                Conoce dragones que están en nuestro mundo y guarda tus favoritos :)
              </p>
            </div>

            <nav className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-200">
              <Link
                to="/"
                className="rounded-full border border-slate-700 bg-slate-800/80 px-4 py-2 transition hover:bg-slate-700"
              >
                Inicio
              </Link>
              <Link
                to="/favorites"
                className="rounded-full border border-slate-700 bg-slate-800/80 px-4 py-2 transition hover:bg-slate-700"
              >
                Favoritos
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 md:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/dragon/:name" element={<DragonDetail />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </FavoritesProvider>
  )
}

export default App