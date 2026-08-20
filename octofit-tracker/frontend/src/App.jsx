import { NavLink, Route, Routes, Link } from 'react-router-dom'
import { apiBaseUrl } from './api.js'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/"><img className="brand-logo" src="/octofitapp-small.png" alt="" /><span>OctoFit <em>Tracker</em></span></Link>
        <nav aria-label="Primary navigation">
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">Members</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
        <span className="status-dot" title={apiBaseUrl}>API connected</span>
      </header>
      {!import.meta.env.VITE_CODESPACE_NAME && <div className="config-notice">VITE_CODESPACE_NAME is not set. Using the local API at {apiBaseUrl}.</div>}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
      <footer>OctoFit Tracker <span>Build healthier habits, together.</span></footer>
    </div>
  )
}

function Home() {
  return <section className="home"><p className="eyebrow">A clearer way to keep moving</p><h1>Small steps.<br /><span>Strong momentum.</span></h1><p className="home-copy">Track the work, find your people, and make every session count.</p><div className="quick-links"><Link to="/activities">Log activity <span>↗</span></Link><Link to="/workouts">Find a workout <span>↗</span></Link><Link to="/leaderboard">See the leaderboard <span>↗</span></Link></div></section>
}

export default App
