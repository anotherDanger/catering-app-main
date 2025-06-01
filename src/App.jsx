import { Routes, Route } from "react-router-dom";
import Layout from "./components/home/Layout";
import Dashboard from "./components/home/Dashboard";
import Register from "./components/register/Register";
import Login from "./components/login/Login";

function App(){
  return(
    <Routes>

      <Route path="/v1/register" element={<Register />}> /</Route>
      <Route path="/v1/login" element={<Login />}></Route>

      <Route path = "/" element={<Layout/>}>
        <Route index element={<Dashboard/>} />
      </Route>
    </Routes>
  )
}

export default App;