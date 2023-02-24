import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { getVideoGamesApi, getVideoGamesDb, orderByAz, orderByZa, searchVideoGames } from "../../redux/actions";
import axios from "axios";
import { Link } from "react-router-dom";



// URL BASE, LA UTILIZAMOS PARA ITERARLA EN UN USE-EFFECTS AGREGANDOLE COMO QUERY LAS PAGINAS, YA QUE POR CADA URL VIENEN 20 VIDEOJUEGOS, Y NECESITAMOS 100. 
const baseUrl = "https://api.rawg.io/api/games?key=7766812f293742f8a1efa2ac33903b70";

function Home({ getVideoGamesApi, videoGamesApi, getVideoGamesDb, orderByAz, orderByZa, searchVideoGames, videoGamesSearch }) {


  const [select, setSelect] = useState()

  const [inputVideoGames, setInputVideoGames] = useState();

  // ESTE USE-EFFECT LLAMA A NUESTRA ACTIONS getVideoGamesApi, ITERANDO 5 VECES PARA LLENAR EL ESTADO de REDUX DE ARRAYS CON VIDEOJUEGOS.

  useEffect(() => {
    for (let i = 1; i <= 5; i++) {
      const videogameUrl = baseUrl + `&page=${i}`;
      getVideoGamesApi(videogameUrl);
    }

    getVideoGamesDb()

  }, [getVideoGamesApi, getVideoGamesDb]);



  /************************************************************ FUNCION + USE EFFECT PARA ORDENAMIENTO A-Z || Z-A ****************************************/

  const ordenarSelect = (e) => setSelect(e.target.value);

  useEffect(() => {
    if (select === 'asc') {
      orderByAz();
    } else if (select === 'desc') {
      orderByZa();
    }
  }, [select, orderByAz, orderByZa, getVideoGamesDb, getVideoGamesApi]);


  /****************************************************************************************************************************************************/

  const handlerInputVideoGames = (e) => setInputVideoGames(e.target.value);

  const handleSearch = () => searchVideoGames(inputVideoGames.toLowerCase())




  return (
    <>

      <input type="search" onChange={handlerInputVideoGames} placeholder="Ingrese un juego" />
      <button onClick={handleSearch}>Buscar</button>


      <select onChange={ordenarSelect} name="select">
        <option value="">ordenar</option>
        <option value="asc">asc</option>
        <option value="desc">desc</option>
        <option value="ninguno">ninguno</option>
      </select>




      {
        videoGamesSearch.length > 0 && videoGamesSearch.map(vg =>

          <div key={vg.id}>
            <h4 style={{ color: 'white' }}>{vg.name}</h4>
          </div>

        )

      }



      {(videoGamesSearch.length === 0 && videoGamesApi) && videoGamesApi.map(vg =>


        <div key={vg.id}>
          <h4 style={{ color: 'white' }}>{vg.name}</h4>
        </div>

      )
      }








    </>
  )

}

const mapStateToProps = (state) => {
  return {
    videoGamesApi: state.videoGamesApi,
    videoGamesSearch: state.videoGamesSearch
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVideoGamesApi: (url) => {
      dispatch(getVideoGamesApi(url));
    },
    getVideoGamesDb: () => {
      dispatch(getVideoGamesDb());
    },
    orderByAz: () => {
      dispatch(orderByAz());
    },
    orderByZa: () => {
      dispatch(orderByZa());
    },
    searchVideoGames: (name) => {
      dispatch(searchVideoGames(name));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
