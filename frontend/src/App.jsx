import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Products from './components/Products';
import BackgroundVideo from './components/BackgroundVideo';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function Home() {
  return (
    <>
      <BackgroundVideo />
      <Hero />
      <Products />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}