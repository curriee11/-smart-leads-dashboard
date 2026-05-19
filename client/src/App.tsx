import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={<div className="min-h-screen bg-slate-50 p-6 text-slate-950">Login page coming next</div>}
        />
        <Route
          path="/dashboard"
          element={<div className="min-h-screen bg-slate-50 p-6 text-slate-950">Dashboard coming next</div>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
