import { useEffect, useState } from 'react'
import { fetchEndpoint } from '../api.js'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchEndpoint(leaderboardEndpoint, controller.signal).then(setEntries).catch((cause) => { if (cause.name !== 'AbortError') setError(cause.message) })
    return () => controller.abort()
  }, [])

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1></div><span className="count">{entries.length} athletes</span></div>{error ? <p className="error-message">{error}</p> : <div className="ranking-list">{entries.map((entry, index) => <article className="ranking-item" key={entry._id}><strong className="rank">{entry.rank || index + 1}</strong><div><h2>{entry.user?.name || entry.user || 'Athlete'}</h2><p>{entry.team?.name || entry.team || 'Independent'}</p></div><b>{entry.points} pts</b></article>)}</div>}</section>
}

export default Leaderboard
