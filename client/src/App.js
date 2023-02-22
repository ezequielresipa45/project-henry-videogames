import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";

function App() {


  return (
    <div className="App">
      <h1>Henry Videogames</h1>

      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/form" element={<Form/>} />
      </Routes>
    </div>
  );
}

export default App;
