import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Products from "./components/Products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
}

export default App;