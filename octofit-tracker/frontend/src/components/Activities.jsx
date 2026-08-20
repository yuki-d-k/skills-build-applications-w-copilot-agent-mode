import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection('activities', controller.signal).then(setActivities).catch((cause) => {
      if (cause.name !== 'AbortError') setError(cause.message)
    })
    return () => controller.abort()
  }, [])

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Movement log</p><h1>Activities</h1></div><span className="count">{activities.length} records</span></div>{error ? <p className="error-message">{error}</p> : <div className="data-table"><div className="table-row table-head"><span>Type</span><span>Duration</span><span>Calories</span><span>Date</span></div>{activities.map((activity) => <div className="table-row" key={activity._id}><span>{activity.type}</span><span>{activity.durationMinutes} min</span><span>{activity.calories} kcal</span><span>{new Date(activity.recordedAt).toLocaleDateString()}</span></div>)}</div>}</section>
}

export default Activities
