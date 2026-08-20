import { useEffect, useState } from 'react'
import { fetchEndpoint, getApiUrl } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { const controller = new AbortController(); fetchEndpoint(getApiUrl('teams'), controller.signal).then(setTeams).catch((cause) => { if (cause.name !== 'AbortError') setError(cause.message) }); return () => controller.abort() }, [])

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Train together</p><h1>Teams</h1></div><span className="count">{teams.length} teams</span></div>{error ? <p className="error-message">{error}</p> : <div className="card-grid">{teams.map((team) => <article className="info-card" key={team._id}><div className="card-mark">{team.name?.slice(0, 1) || 'T'}</div><h2>{team.name}</h2><p>{team.description}</p><small>{team.members?.length || 0} members</small></article>)}</div>}</section>
}

export default Teams
