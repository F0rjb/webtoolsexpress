import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/layouts/Footer";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Footer />
      <Routes>
        <Route path="/" />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
