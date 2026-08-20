import { useEffect, useState } from 'react'
import { fetchEndpoint, getApiUrl } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { const controller = new AbortController(); fetchEndpoint(getApiUrl('users'), controller.signal).then(setUsers).catch((cause) => { if (cause.name !== 'AbortError') setError(cause.message) }); return () => controller.abort() }, [])

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Your community</p><h1>Members</h1></div><span className="count">{users.length} members</span></div>{error ? <p className="error-message">{error}</p> : <div className="data-table">{users.map((user) => <div className="table-row member-row" key={user._id}><div><strong>{user.name}</strong><small>{user.email}</small></div><span>{user.goal}</span><span>Level {user.level}</span></div>)}</div>}</section>
}

export default Users
