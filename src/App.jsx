import { Routes, Route } from "react-router-dom";
import Layout from "./components/home/Layout";
import Dashboard from "./components/home/Dashboard";


function App(){
  return(
    <Routes>
      <Route path = "/" element={<Layout/>}>
        <Route index element={<Dashboard/>} />
      </Route>
    </Routes>
  )
}

export default App;