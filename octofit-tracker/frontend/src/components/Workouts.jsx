import { useEffect, useState } from 'react'
import { fetchEndpoint } from '../api.js'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { const controller = new AbortController(); fetchEndpoint(workoutsEndpoint, controller.signal).then(setWorkouts).catch((cause) => { if (cause.name !== 'AbortError') setError(cause.message) }); return () => controller.abort() }, [])

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Your next session</p><h1>Workouts</h1></div><span className="count">{workouts.length} plans</span></div>{error ? <p className="error-message">{error}</p> : <div className="card-grid">{workouts.map((workout) => <article className="info-card workout-card" key={workout._id}><span className="tag">{workout.category}</span><h2>{workout.title}</h2><p>{workout.target}</p><footer><span>{workout.durationMinutes} min</span><span>{workout.difficulty}</span></footer></article>)}</div>}</section>
}

export default Workouts
