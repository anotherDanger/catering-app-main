import { Routes, Route } from "react-router-dom";
import Layout from "./components/home/Layout";
import Dashboard from "./components/home/Dashboard";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Checkout from "./components/checkout/Checkout";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Ini yang render di <Outlet /> */}
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="/v1/login" element={<Login />} />
      <Route path="/v1/register" element={<Register />} />
      <Route path="/v1/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;