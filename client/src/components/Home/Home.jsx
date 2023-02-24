import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { getVideoGamesApi, getVideoGamesDb } from "../../redux/actions";
import axios from "axios";
import { Link } from "react-router-dom";



// URL BASE, LA UTILIZAMOS PARA ITERARLA EN UN USE-EFFECTS AGREGANDOLE COMO QUERY LAS PAGINAS, YA QUE POR CADA URL VIENEN 20 VIDEOJUEGOS, Y NECESITAMOS 100. 
const baseUrl = "https://api.rawg.io/api/games?key=7766812f293742f8a1efa2ac33903b70";

function Home({ getVideoGamesApi, videoGamesApi, getVideoGamesDb }) {




  // ESTE ESTADO LO VAMOS A UTILIZAR PARA GUARDAR LOS 100 VIDEOJUEGOS EN UN SOLO ARRAY, YA QUE EN MI ESTADO DE REDUX ME VIENEN DE A 20 VIDEOJUEGOS POR ARRAYS.
  const [videoGames, setVideoGames] = useState();



  // ESTADO PARA ALMACENAR LOS GENEROS FILTRADOS [RPG, ACTION, AVENTURE]
  const [genre, setGenre] = useState();


  // ESTADO QE ALMACENA SOLAMENTE LOS VIDEOJUEGOS DEMI BASE DE DATOS

  const [dbVideoGames, setDbVideoGames] = useState();


  // ESTADO PARA GUARDAR DE AXIOS LOS DATOS DE LA API, QUE VAN A SER LOS GENEROS
  const [genreApi, setGenreApi] = useState();


  // ESTE ESTADO LO UTILIZAREMOS PARA ALMACENAR EL VALOR QUE RECIBIMOS POR INPUT DEL USUARIO
  const [character, setcharacter] = useState();


  // ESTE ESTADO CONTENDRA EL LISTADO DE VIDEOJUEGOS SEGUN LO QUE EL USUARIO REQUIERA EN EL CAMPO INPUT DE BUSQUEDA DE VIDEOJUEGOS
  const [videoGamesFilter, setVideoGamesFilter] = useState();

  // Almacena los videoJuegos filtrados por genero.
  const [videoGamesForGenre, setVideoGamesForGenre] = useState();



  // Estado para almacenar los valores del input order by, almacenara [ascendent, descendent, etc]
  const [value, setValue] = useState();





  // ESTADO PARA PAGINAR LOS VIDEOJUEGOS

  const [currentPage, setCurrentPage] = useState(1);


  const pageSize = 15;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };


  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };




  const sliceStart = pageSize * (currentPage - 1);
  const sliceEnd = pageSize * currentPage;


  const handleValue = (e) => {
    setValue(e.target.value);
    // console.log(e.target.value);
  }



  // HANDLER PARA SETEAR EL VALOR DEL ESTADO, ESTE ESTADO CONTIENE EL VALOR DEL INPUT PARA BUSCAR VIDEOJUEGOS.
  const handleNames = (e) => setcharacter(e.target.value);


  // HANDLER PARA ALMACENAR EN EL ESTADO GENRE, EL VALOR DEL INPUT QUE EL USUARIO SELECCIONE.
  const handleChange = (e) => {
    setGenre(e.target.value);
    console.log(e.target.value)
  };


  // ESTE USE-EFFECT LLAMA A NUESTRA ACTIONS getVideoGamesApi, ITERANDO 5 VECES PARA LLENAR EL ESTADO de REDUX DE ARRAYS CON VIDEOJUEGOS.
  useEffect(() => {
    for (let i = 1; i <= 5; i++) {
      const videogameUrl = baseUrl + `&page=${i}`;
      getVideoGamesApi(videogameUrl);
    }

    getVideoGamesDb()

  }, [getVideoGamesApi, getVideoGamesDb]);




  // use effect para traernos todos los generos y poder guardarlos en un estado para luego mapearlos en las options

  useEffect(() => { axios.get("https://api.rawg.io/api/genres?key=7766812f293742f8a1efa2ac33903b70").then((response) => setGenreApi(response.data.results)) }, [])



  // ESTE USE-EFFECT CONCATENA TODOS LOS ARRAYS DE MI ESTADO DE REDUX Y LOS ALMACENA EN EL ESTADO DE REACT videoGames
  useEffect(() => {
    if (videoGamesApi.length > 5) {
      let concatVideoGames = videoGamesApi[0].concat(
        videoGamesApi[1],
        videoGamesApi[2],
        videoGamesApi[3],
        videoGamesApi[4],
        videoGamesApi[5],

      );
      // console.log(concatVideoGames)

      setVideoGames(concatVideoGames);



    }


  }, [videoGamesApi]);






  // USE EFFECT, FILTRADO DE VIDEOJUEGOS POR GENERO. 
  useEffect(() => {

    if (genre) {

      //SOME nos permite comprobar si alguno de los elementos de un array cumple una condición determinada.
      setCurrentPage(1)

      if (genre === 'myVideoGames') {
        setCurrentPage(100)


        let filtradoBaseDeDatos = videoGamesFilter.filter(vg => vg.hasOwnProperty("create"))


        setDbVideoGames(filtradoBaseDeDatos)

      } else {



        let filtradoVideoGames = videoGamesFilter.filter(videoGame => { return videoGame.genres.some(obj => obj.name === genre) });
        // console.log( filtradoVideoGames )
        if (!filtradoVideoGames.length) { alert("NO HAY NADA CON ESE FILTRO") }
        setVideoGamesForGenre(filtradoVideoGames)


      }


    }

  }, [genre, videoGamesFilter])




  let randomNumber = Math.random() * 5;

Math.floor(randomNumber);


  if (videoGames) {

    //FUNCION QUE VA A FILTRAR A LOS VIDEOJUEGOS SEGUN LO QUE EL USUARIO PIDA, EL FILTRADO SE ALMACENA EN videoGamesFilter

    const onSearch = (videojuego, state) => {
      setCurrentPage(1)
      let filtrado = state.filter((vg) =>
        vg.name.toLowerCase().includes(videojuego.toLowerCase())
      );
      if (filtrado.length > 0) {
        // console.log(state, videojuego);
        setGenre('')
        setVideoGamesFilter(filtrado);
      } else {
        alert("No hay videojuego con ese ID");
      }
    };


    if (genre && genre === 'ninguno') {

      onSearch(character, videoGames)
    }


    // FUNCION PARA ORDENAR DE LA A-Z - Z-A  || RATING ASC- RATING DESC

    function sortArray(array, value) {
      if (value === 'ascendent') {
        array.sort((a, b) => (a.name > b.name) ? 1 : -1);
      } else if (value === 'descendent') {
        array.sort((a, b) => (b.name > a.name) ? 1 : -1);
      }

      if (value === 'rating-asc') {
        array.sort((a, b) => (b.rating > a.rating) ? 1 : -1);
      } else if (value === 'rating-desc') {
        array.sort((a, b) => (a.rating > b.rating) ? 1 : -1);
      }
    }

    if (videoGamesForGenre && value) {
      sortArray(videoGamesForGenre, value);
    }

    if (videoGamesFilter && value) {
      sortArray(videoGamesFilter, value);
    }


   




    return (
      <div>


        <h2>SOY EL HOME</h2>

        <input
          type="search"
          onChange={handleNames}
          placeholder="Ingrese un nombre en minuscula.."
        />
        <button onClick={() => onSearch(character, videoGames)}>Buscar</button>


        <div>
          <label htmlFor="">Filtrar por: </label>
          <select value={genre} onChange={handleChange} defaultValue="default">
            <option value="default" disabled>Generos</option>
            <option value="ninguno" >Ninguno</option>
            <option value="myVideoGames" >My VideoGames</option>

            {genreApi && genreApi.map(gnre => (
              <option key={gnre.name} value={gnre.name}>{gnre.name}</option>
            ))}
          </select>
        </div>



        <div>

          <label> Order by: </label>

          <select value={value} onChange={handleValue} defaultValue="default" >
            <option value="default" disabled></option>
            <option value="ascendent">A-Z</option>
            <option value="descendent">Z-A</option>
            <option value="rating-asc">Rating Ascendente</option>
            <option value="rating-desc">Rating Descendente</option>

          </select>



        </div>

        {videoGamesFilter && console.log(videoGamesFilter.slice(sliceStart, sliceEnd))}






{!videoGamesFilter && 

videoGamesApi[parseInt(randomNumber)].map(


  (vg) =>
  <Link to={`/detail/${vg.id}`} key={vg.id}>
                <div
  style={{backgroundColor:"red"}}
                  key={vg.id}>
  
                  {/* {console.log(vg)} */}
  
                  <h2>{vg.name}</h2>
  
                  <img width={200} src={vg.background_image} alt={vg.name} />
  
  
  
                  {vg.genres && vg.genres.map(date => <h2 key={date.name}>{date.name}</h2>)}
  
                  <hr />
  
  
                </div></Link>








)




}






        {


          !genre ?

            videoGamesFilter && videoGamesFilter.slice(sliceStart, sliceEnd).map((vg) =>
<Link to={`/detail/${vg.id}`} key={vg.id}>
              <div
style={{backgroundColor:"red"}}
                key={vg.id}>

                {/* {console.log(vg)} */}

                <h2>{vg.name}</h2>

                <img width={200} src={vg.background_image} alt={vg.name} />



                {vg.genres && vg.genres.map(date => <h2 key={date.name}>{date.name}</h2>)}

                <hr />


              </div></Link>)

            :

            (genre !== 'myVideoGames' && videoGamesForGenre) && videoGamesForGenre.slice(sliceStart, sliceEnd).map(vg =>


              <Link to={`/detail/${vg.id}`} key={vg.id}>
              <div key={vg.id}>


                <h2>{vg.name}</h2>

                <img width={200} src={vg.background_image} alt={vg.name} />


                {vg.genres && vg.genres.map(date => <h2 key={date.name}>{date.name}</h2>)}

                <hr />


              </div></Link>

            )

        }

        {dbVideoGames && dbVideoGames.map((vg) =>


              <Link to={`/detail/${vg.id}`} key={vg.id}>

          <div className="dbVideoGames"
            style={genre !== 'myVideoGames' ? { display: 'none' } : { display: 'block' }}

            key={vg.id}>

            <h2>{vg.name}</h2>

            <img width={200} src={vg.background_image} alt={vg.name} />



            {vg.genres && vg.genres.map(date => <h2 key={date.name}>{date.name}</h2>)}

            <hr />


          </div> </Link>)}

        {videoGamesFilter && (
          <div className="MostrarMasVideoGamesFilter"
            style={videoGamesForGenre ? { display: "none" } : { display: "block", backgroundColor: 'red' }}
          >
            <button className="btn-anterior" style={currentPage === 1 || genre === 'myVideoGames' ? { display: "none" } : { display: 'inline-block' }} onClick={handlePrevPage}>Anterior</button>
            <button className="btn-siguiente" style={videoGamesFilter.length > sliceEnd ? { display: "inline-block" } : { display: 'none' }} onClick={handleNextPage}>Siguiente</button>
            <hr />


          </div>
        )}


        {videoGamesForGenre && (
          <div
          >
            <button className="btn-anterior" style={currentPage === 1 || genre === 'myVideoGames' ? { display: "none" } : { display: 'inline-block' }} onClick={handlePrevPage}>Anterior</button>
            <button className="btn-siguiente" style={videoGamesForGenre.length > sliceEnd ? { display: "inline-block" } : { display: 'none' }} onClick={handleNextPage}>Siguiente</button>
            <hr />


          </div>
        )}

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
    getVideoGamesDb: () => {
      dispatch(getVideoGamesDb());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);