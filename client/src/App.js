import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";

function App() {
  // const [videoGamesFilter, setVideoGamesFilter] = useState();

  // const onSearch = (videojuego, state) => {
  //   let filtrado = state.filter((vg) => vg.id === videojuego);
  //   if (filtrado) {
  //     setVideoGamesFilter(filtrado);
  //   } else {
  //     console.log("No hay videojuego con ese ID");
  //   }
  // };

  return (
    <div className="App">
      <h1>Henry Videogames</h1>

      <Routes>
        <Route path="/home" element={<Home 
        />} />
      </Routes>
    </div>
  );
}

export default App;
