import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import DragonList from '../components/DragonList'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import { fetchDragons } from '../services/DragonService'
import type { Dragon } from '../services/DragonService'

export default function Home() {
    const [dragons, setDragons] = useState<Dragon[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [search, setSearch] = useState('')

    useEffect(() => {
        const loadDragons = async () => {
            try {
                setLoading(true)
                const data = await fetchDragons()
                setDragons(data)
                setError(null)
            } catch (err) {
                setError(err)
                setDragons([])
            } finally {
                setLoading(false)
            }
        }
        
        loadDragons()
    }, [])

    const filteredDragons = dragons.filter(dragon =>
        dragon.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="p-4">
            <SearchBar onSearch={setSearch} />
            {loading && <Loader />}
            {error && <ErrorMessage />}
            {!loading && !error && filteredDragons.length === 0 && <EmptyState />}
            {!loading && !error && filteredDragons.length > 0 && <DragonList dragons={filteredDragons} />}
        </div>
    )
}