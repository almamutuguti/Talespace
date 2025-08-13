import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import BookDetails from "./pages/BookDetails"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/Navbar"
import { useAuth } from "./context/AuthContext"
import Spinner from "./components/Spinner"

function App() {
  const { loading } = useAuth()

  if (loading) return <Spinner />

  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/book/:id" element={<BookDetails />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
      </Routes>
    </Router>
  )
}

export default App
