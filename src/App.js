import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import DataManager from "./components/DataManager";
import Home from "./components/Home";
import About from "./components/About";
import Details from "./components/Details";

function App() {
  return (
    <div className="App">
      <div className="nav">
        <Link to={`/home`}>Home</Link>
        <Link to={`/about`}>About</Link>
        <Link to={`/orders`}>DataManager</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/orders" element={<DataManager />} />
        <Route path="/orders/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
