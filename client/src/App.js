import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Fib from "./Fib";
import OtherPage from "./OtherPage";
function App() {
  return (
    <Router>
      <h1>FIB CALCULATOR</h1>
      <nav>
        <Link to="/">Home | </Link>
        <Link to="/otherpage">Otherpage</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Fib />} />
        <Route path="/otherpage" element={<OtherPage />} />
      </Routes>
    </Router>
  );
}

export default App;
