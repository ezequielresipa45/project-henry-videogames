import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { getVideoGamesApi } from "../../redux/actions";



// URL BASE, LA UTILIZAMOS PARA ITERARLA EN UN USE-EFFECTS AGREGANDOLE COMO QUERY LAS PAGINAS, YA QUE POR CADA URL VIENEN 20 VIDEOJUEGOS, Y NECESITAMOS 100. 
const baseUrl ="https://api.rawg.io/api/games?key=7766812f293742f8a1efa2ac33903b70";

function Home({ getVideoGamesApi, videoGamesApi }) {


  // ESTE ESTADO LO VAMOS A UTILIZAR PARA GUARDAR LOS 100 VIDEOJUEGOS EN UN SOLO ARRAY, YA QUE EN MI ESTADO DE REDUX ME VIENEN DE A 20 VIDEOJUEGOS POR ARRAYS.
  const [videoGames, setVideoGames] = useState();


  // ESTE ESTADO LO UTILIZAREMOS PARA ALMACENAR EL VALOR QUE RECIBIMOS POR INPUT DEL USUARIO
  const [character, setcharacter] = useState();


// ESTE ESTADO CONTENDRA EL FILTRADO DE VIDEOJUEGOS SEGUN LO QUE EL USUARIO REQUIERA EN EL CAMPO INPUT
  const [videoGamesFilter, setVideoGamesFilter] = useState();

  const handleNames = (e) => setcharacter(e.target.value);  // HANDLER PARA SETEAR EL VALOR DEL ESTADO, ESTE ESTADO CONTIENE EL VALOR DEL INPUT.




  // ESTE USE-EFFECT LLAMA A NUESTRA ACTIONS getVideoGamesApi, ITERANDO 5 VECES PARA LLENAR EL ESTADO de REDUX DE ARRAYS CON VIDEOJUEGOS.
  useEffect(() => {
    for (let i = 1; i <= 5; i++) {
      const videogameUrl = baseUrl + `&page=${i}`;
      getVideoGamesApi(videogameUrl);
    }
  }, [getVideoGamesApi]);



// ESTE USE -EFFECT CONCATENA TODOS LOS ARRAYS DE MI ESTADO DE REDUX Y LOS ALMACENA EN EL ESTADO DE REACT videoGames
  useEffect(() => {
    if (videoGamesApi.length > 4) {
      let concatVideoGames = videoGamesApi[0].concat(
        videoGamesApi[1],
        videoGamesApi[2],
        videoGamesApi[3],
        videoGamesApi[4]
      );
      // console.log(concatVideoGames)

      setVideoGames(concatVideoGames);
    }
  }, [videoGamesApi.length, videoGamesApi]);




  if (videoGames) {
    // console.log(videoGames);



    //FUNCION QUE VA A FILTRAR A LOS VIDEOJUEGOS SEGUN LO QUE EL USUARIO PIDA, EL FILTRADO SE ALMACENA EN videoGamesFilter
    
    const onSearch = (videojuego, state) => {
      let filtrado = state.filter((vg) =>
        vg.name.toLowerCase().includes(videojuego)
      );
      if (filtrado) {
        console.log(state, videojuego);
        setVideoGamesFilter(filtrado);
      } else {
        console.log("No hay videojuego con ese ID");
      }
    };

    return (
      <div>
        <h2>SOY EL HOME</h2>

        <input
          type="search"
          onChange={handleNames}
          placeholder="Ingrese un nombre en minuscula.."
        />
        <button onClick={() => onSearch(character, videoGames)}>Agregar</button>

        {videoGamesFilter && videoGamesFilter.map((vg) => <h2>{vg.name}</h2>)}
      </div>
    );
  } else {
    return (
      <div>
        <h2>CARGANDO....</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    videoGamesApi: state.videoGamesApi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVideoGamesApi: (url) => {
      dispatch(getVideoGamesApi(url));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
