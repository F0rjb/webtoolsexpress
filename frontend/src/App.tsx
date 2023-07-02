import logo from "./logo.svg"
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Auth from "./components/pages/Auth"
import Dashboard from "./components/pages/Dashboard"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import { useAppDispatch } from "./app/hooks"
import { useEffect } from "react"
import { setUser } from "./features/authSlice"
import PrivateRoute from "./components/PrivateRoute"
import Products from "./components/pages/Products"
import Navbar from "./components/Navbar"

function App() {
  const dispatch = useAppDispatch()
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  useEffect(() => {
    dispatch(setUser(user))
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
