import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { getVideoGamesApi, getVideoGamesDb } from "../../redux/actions";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "infinite-react-carousel";
import styles from "./Home.module.css";
import logo from "../../images/logo.png";
import search from "../../images/buscar.png";
import flecha_izquierda from "../../images/flecha-izquierda.png"
import flecha_derecha from "../../images/flecha-derecha.png"

// URL BASE, LA UTILIZAMOS PARA ITERARLA EN UN USE-EFFECTS AGREGANDOLE COMO QUERY LAS PAGINAS, YA QUE POR CADA URL VIENEN 20 VIDEOJUEGOS, Y NECESITAMOS 100.
const baseUrl =
  "https://api.rawg.io/api/games?key=28d152a4795c4f858cae0c606a326643";

let arrayStars = ["⭐", "⭐", "⭐", "⭐"];

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
  };

  // HANDLER PARA SETEAR EL VALOR DEL ESTADO, ESTE ESTADO CONTIENE EL VALOR DEL INPUT PARA BUSCAR VIDEOJUEGOS.
  const handleNames = (e) => setcharacter(e.target.value);

  // HANDLER PARA ALMACENAR EN EL ESTADO GENRE, EL VALOR DEL INPUT QUE EL USUARIO SELECCIONE.
  const handleChange = (e) => {
    setGenre(e.target.value);
    console.log(e.target.value);
  };

  // ESTE USE-EFFECT LLAMA A NUESTRA ACTIONS getVideoGamesApi, ITERANDO 5 VECES PARA LLENAR EL ESTADO de REDUX DE ARRAYS CON VIDEOJUEGOS.
  useEffect(() => {
    for (let i = 1; i <= 5; i++) {
      const videogameUrl = baseUrl + `&page=${i}`;
      getVideoGamesApi(videogameUrl);
    }

    getVideoGamesDb();
  }, [getVideoGamesApi, getVideoGamesDb]);

  // use effect para traernos todos los generos y poder guardarlos en un estado para luego mapearlos en las options

  useEffect(() => {
    axios
      .get(
        "https://api.rawg.io/api/genres?key=28d152a4795c4f858cae0c606a326643"
      )
      .then((response) => setGenreApi(response.data.results));
  }, []);

  // ESTE USE-EFFECT CONCATENA TODOS LOS ARRAYS DE MI ESTADO DE REDUX Y LOS ALMACENA EN EL ESTADO DE REACT videoGames
  useEffect(() => {
    if (videoGamesApi.length > 5) {
      let concatVideoGames = videoGamesApi[0].concat(
        videoGamesApi[1],
        videoGamesApi[2],
        videoGamesApi[3],
        videoGamesApi[4],
        videoGamesApi[5]
      );
      // console.log(concatVideoGames)

      setVideoGames(concatVideoGames);
    }
  }, [videoGamesApi]);

  // USE EFFECT, FILTRADO DE VIDEOJUEGOS POR GENERO.
  useEffect(() => {
    if (genre) {
      //SOME nos permite comprobar si alguno de los elementos de un array cumple una condición determinada.
      setCurrentPage(1);

      if (genre === "myVideoGames") {
        setCurrentPage(100);

        let filtradoBaseDeDatos = videoGamesFilter.filter((vg) =>
          vg.hasOwnProperty("create")
        );

        setDbVideoGames(filtradoBaseDeDatos);
      } else {
        let filtradoVideoGames = videoGamesFilter.filter((videoGame) => {
          return videoGame.genres.some((obj) => obj.name === genre);
        });
        // console.log( filtradoVideoGames )
        if (!filtradoVideoGames.length) {
          alert("NO HAY NADA CON ESE FILTRO");
        }
        setVideoGamesForGenre(filtradoVideoGames);
      }
    }
  }, [genre, videoGamesFilter]);

  let randomNumber = Math.random() * 5;

  Math.floor(randomNumber);

  if (videoGames) {
    //FUNCION QUE VA A FILTRAR A LOS VIDEOJUEGOS SEGUN LO QUE EL USUARIO PIDA, EL FILTRADO SE ALMACENA EN videoGamesFilter

    const onSearch = (videojuego, state) => {
      setCurrentPage(1);
      let filtrado = state.filter((vg) =>
        vg.name.toLowerCase().includes(videojuego.toLowerCase())
      );
      if (filtrado.length > 0) {
        // console.log(state, videojuego);
        setGenre("");
        setVideoGamesFilter(filtrado);
      } else {
        alert("No hay videojuego con ese ID");
      }
    };

    // if (genre && genre === "ninguno") {
    //   onSearch(character, videoGames);
    // }

    // FUNCION PARA ORDENAR DE LA A-Z - Z-A  || RATING ASC- RATING DESC

    function sortArray(array, value) {
      if (value === "ascendent") {
        array.sort((a, b) => (a.name > b.name ? 1 : -1));
      } else if (value === "descendent") {
        array.sort((a, b) => (b.name > a.name ? 1 : -1));
      }

      if (value === "rating-asc") {
        array.sort((a, b) => (b.rating > a.rating ? 1 : -1));
      } else if (value === "rating-desc") {
        array.sort((a, b) => (a.rating > b.rating ? 1 : -1));
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
        <div>
          {/* <Slider className={styles.sliderImages}>

{videoGames.slice(0, 5).map(image => <div key={image}>

  <p className={styles.titleImages}>{image.name}</p>
  <img  src={image.background_image} alt="img" />



</div>)}

</Slider> */}

          {videoGames && console.log(videoGames)}
          <section className={styles.slider}>
            <Slider className={styles.slider__content}>
              {videoGames.slice(0, 5).map((image) => (
                <div key={image.id} className={styles.slider__content__item}>
                  <img src={image.background_image} alt={image.name} />

                  <div className={styles.slider__content__descripction}>
                    <p className={styles.slider__description__name}>
                      {image.name}
                    </p>

                    <div className={styles.slider__content_rating__released}>
                      <p className={styles.slider__description__rating}>
                        <b>{image.rating}</b> / 5{" "}
                        {(Math.floor(image.rating) === 1 && arrayStars[0]) ||
                          (Math.floor(image.rating) === 2 &&
                            arrayStars[0] + arrayStars[1]) ||
                          (Math.floor(image.rating) === 3 &&
                            arrayStars[0] + arrayStars[1] + arrayStars[2]) ||
                          (Math.floor(image.rating) >= 4 &&
                            arrayStars[0] +
                              arrayStars[1] +
                              arrayStars[2] +
                              arrayStars[3])}
                      </p>
                      <p className={styles.slider__description__released}>
                        {image.released} 📅
                      </p>
                    </div>

                    <div className={styles.slider__content_genres__platforms}>
                      <div className={styles.slider__content_genres}>
                        {image.genres &&
                          image.genres.map((gres) => (
                            <p
                              key={gres.name}
                              className={
                                styles.slider__description__genre__name
                              }
                            >
                              {gres.name}
                            </p>
                          ))}
                      </div>
                      <div className={styles.slider__content_platforms}>
                        {image.platforms &&
                          image.platforms.slice(0, 2).map((imgPlat) => (
                            <>
                              <p
                                className={
                                  styles.slider__description__platform__name
                                }
                              >
                                {imgPlat.platform.name}
                              </p>
                            </>
                          ))}
                      </div>
                    </div>
                    <Link
                      className={styles.container__slider__btn}
                      to={`/detail/${image.id}`}
                      key={image.id}
                    >
                      {" "}
                      Go To Game 🎮{" "}
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          </section>
        </div>

        <div className={styles.container__search__filters}>
          <div className={styles.container__input__search}>
            <img src={logo} alt="Logo" width={200} />
            <input
              type="search"
              onChange={handleNames}
              placeholder="Search 876,200 games"
              className={styles.input__search}
            />
            <button onClick={() => onSearch(character, videoGames)}>
              <img src={search} alt="SearchIcon" />{" "}
            </button>
          </div>

          <div
            className={styles.container__filters}
            style={
              !videoGamesFilter ? { display: "none" } : { display: "flex" }
            }
          >
            <div className={styles.container__filters__genres}>
              <select
                value={genre}
                onChange={handleChange}
                defaultValue="default"
              >
                <option value="default" disabled>
                  Generos
                </option>
                <option value="myVideoGames">My VideoGames</option>

                {genreApi &&
                  genreApi.map((gnre) => (
                    <option key={gnre.name} value={gnre.name}>
                      {gnre.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className={styles.container__filters__order}>
              <select
                value={value}
                onChange={handleValue}
                defaultValue="default"
              >
                <option value="default" disabled>
                  {" "}
                  Order by:
                </option>
                <option value="ascendent">A-Z</option>
                <option value="descendent">Z-A</option>
                <option value="rating-asc">Rating Ascendente</option>
                <option value="rating-desc">Rating Descendente</option>
              </select>
            </div>
          </div>
        </div>

        {videoGamesFilter &&
          console.log(videoGamesFilter.slice(sliceStart, sliceEnd))}

        {!videoGamesFilter && (
          <div>
            <h1>New and trending</h1>
            <h4>Based on player counts and release date</h4>

            <div className={styles.container__videoGame}>
              {videoGamesApi[1].map((vg) => (
                <div className={styles.container__card__videoGame} key={vg.id}>
                  <img src={vg.background_image} alt={vg.name} />
                  <h2>{vg.name}</h2>
                  <div className={styles.container__released}>
                    <p>Release date:</p>
                    <h3>{vg.released}</h3>
                  </div>
                  <hr />
                  <div className={styles.container__card__genres}>
                    <p>Genres:</p>
                    <div>
                      {vg.genres &&
                        vg.genres
                          .slice(0, 3)
                          .map((date) => <h3 key={date.name}>{date.name}</h3>)}
                    </div>
                  </div>

                  <hr />

                  <div className={styles.container__chart}>
                    <p>Chart:</p>
                    <h3>#{vg.rating_top} Top 2023</h3>
                  </div>

                  <Link
                    to={`/detail/${vg.id}`}
                    key={vg.id}
                    className={styles.btn__card}
                  >
                    {" "}
                    <span>Show more of this</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {!genre
          ? videoGamesFilter && (
              <div>
                <h1>{`VideoGames "${character}"`}</h1>
                <h4>Based on player counts and release date</h4>




                <div className={styles.container__videoGame}> 
                {videoGamesFilter.slice(sliceStart, sliceEnd).map((vg) => (
                <div className={styles.container__card__videoGame} key={vg.id}>
                <img src={vg.background_image} alt={vg.name} />
                <h2>{vg.name}</h2>
                <div className={styles.container__released}>
                  <p>Release date:</p>
                  <h3>{vg.released}</h3>
                </div>
                <hr />
                <div className={styles.container__card__genres}>
                  <p>Genres:</p>
                  <div>
                    {vg.genres &&
                      vg.genres
                        .slice(0, 3)
                        .map((date) => <h3 key={date.name}>{date.name}</h3>)}
                  </div>
                </div>

                <hr />

                <div className={styles.container__chart}>
                  <p>Chart:</p>
                  <h3>#{vg.rating_top} Top 2023</h3>
                </div>

                <Link
                  to={`/detail/${vg.id}`}
                  key={vg.id}
                  className={styles.btn__card}
                >
                  {" "}
                  <span>Show more of this</span>
                </Link>
              </div>
                ))}
                </div>
              </div>
            )
          : genre !== "myVideoGames" &&
            videoGamesForGenre && (
              <div>
                <h1>{`VideoGames "${character}" - ${genre}`}</h1>
                <h4>Based on player counts and release date</h4>


                <div className={styles.container__videoGame}>  
                {videoGamesForGenre.slice(sliceStart, sliceEnd).map((vg) => (
                <div className={styles.container__card__videoGame} key={vg.id}>
                <img src={vg.background_image} alt={vg.name} />
                <h2>{vg.name}</h2>
                <div className={styles.container__released}>
                  <p>Release date:</p>
                  <h3>{vg.released}</h3>
                </div>
                <hr />
                <div className={styles.container__card__genres}>
                  <p>Genres:</p>
                  <div>
                    {vg.genres &&
                      vg.genres
                        .slice(0, 3)
                        .map((date) => <h3 key={date.name}>{date.name}</h3>)}
                  </div>
                </div>

                <hr />

                <div className={styles.container__chart}>
                  <p>Chart:</p>
                  <h3>#{vg.rating_top} Top 2023</h3>
                </div>

                <Link
                  to={`/detail/${vg.id}`}
                  key={vg.id}
                  className={styles.btn__card}
                >
                  {" "}
                  <span>Show more of this</span>
                </Link>
              </div>
                ))}
                </div>
              </div>
            )}

        {dbVideoGames && (
          <div>
            <h1>{`VideoGames "${character}" - My VideoGames`}</h1>
            <h4>Based on player counts and release date</h4>

            <div className={styles.container__videoGame}>

            {dbVideoGames.map((vg) => (
              
                <div
                  className="dbVideoGames"
                  style={
                    genre !== "myVideoGames"
                      ? { display: "none" }
                      : { display: "block" }
                  }
                  key={vg.id}
                >
                                 <div className={styles.container__card__videoGame} key={vg.id}>
                  <img src={vg.background_image} alt={vg.name} />
                  <h2>{vg.name}</h2>
                  <div className={styles.container__released}>
                    <p>Release date:</p>
                    <h3>{vg.released}</h3>
                  </div>
                  <hr />
                  <div className={styles.container__card__genres}>
                    <p>Genres:</p>
                    <div>
                      {vg.genres &&
                        vg.genres
                          .slice(0, 3)
                          .map((date) => <h3 key={date.name}>{date.name}</h3>)}
                    </div>
                  </div>

                  <hr />

                  <div className={styles.container__chart}>
                    <p>Chart:</p>
                    <h3>#{vg.rating_top} Top 2023</h3>
                  </div>

                  <Link
                    to={`/detail/${vg.id}`}
                    key={vg.id}
                    className={styles.btn__card}
                  >
                    {" "}
                    <span>Show more of this</span>
                  </Link>
                </div>










                </div>
              
            ))} </div>
          </div>
        )}

        {videoGamesFilter && (
          <div
            className={styles.MostrarMasVideoGamesFilter}
            style={
              videoGamesForGenre
                ? { display: "none" }
                : { display: "flex"}
            }
          >
            <button
              className="btn-anterior"
              style={
                currentPage === 1 || genre === "myVideoGames"
                  ? { display: "none" }
                  : { display: "flex" }
              }
              onClick={handlePrevPage}
            >



<img src={flecha_izquierda} width = {15} alt="arrow" />
              Previous page
            </button>
            <button className="btn-siguiente"
              style={
                videoGamesFilter.length > sliceEnd
                  ? { display: "flex" }
                  : { display: "none" }
              }
              onClick={handleNextPage}
            >
              Next page 
<img src={flecha_derecha} width = {15} alt="arrow" />

            </button>
            
          </div>
        )}

        {videoGamesForGenre && (
          <div className={styles.MostrarMasVideoGames}>

            <button
              className="btn-anterior"
              style={
                currentPage === 1 || genre === "myVideoGames"
                  ? { display: "none" }
                  : { display: "flex" }
              }
              onClick={handlePrevPage}
            >
           <img src={flecha_izquierda} width = {15} alt="arrow" />
              Previous page

            </button>
            <button
              className="btn-siguiente"
              style={
                videoGamesForGenre.length > sliceEnd
                  ? { display: "flex" }
                  : { display: "none" }
              }
              onClick={handleNextPage}
            >
              Next page 
            <img src={flecha_derecha} width = {15} alt="arrow" />
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className={styles.spinner}>
        <div className={styles.loader}>
          <svg viewBox="0 0 80 80">
            <circle id="test" cx="40" cy="40" r="32"></circle>
          </svg>
        </div>

        <div className={`${styles.loader} ${styles.triangle}`}>
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
        </div>

        <div className={styles.loader}>
          <svg viewBox="0 0 80 80">
            <rect x="8" y="8" width="64" height="64"></rect>
          </svg>
        </div>
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
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
