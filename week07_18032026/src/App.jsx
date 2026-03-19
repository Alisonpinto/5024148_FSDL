import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home.jsx";
import Students from "./Students.jsx";
import Contact from "./Contact.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center" }}>
        <h1>Student Dashboard</h1>

        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/students"> Students</Link> | 
          <Link to="/contact"> Contact</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;