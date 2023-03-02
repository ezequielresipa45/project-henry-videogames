import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  let arrayStars = ["⭐", "⭐", "⭐", "⭐"];

  const [videoGames, setVideoGames] = useState();
  const [videoGamesDb, setVideoGamesDb] = useState();

  let hasMultipleDashes = false;

  // Esto comprueba si el argumento id contiene dos o más guiones. Si es así, la variable hasMultipleDashes tendrá un valor de true. Lo hago para saber si el ID recibido es el de la base de datos o de la api.

  if (id.match(/-+/g) !== null && id.match(/-+/g).length > 1) {
    hasMultipleDashes = true;
  }

  useEffect(() => {
    if (!hasMultipleDashes) {
      axios
        .get(
          `https://api.rawg.io/api/games/${id}?key=28d152a4795c4f858cae0c606a326643`
        )
        .then((response) => {
          setVideoGames(response.data);
        });
    }
  }, [id, hasMultipleDashes]);

  useEffect(() => {
    if (hasMultipleDashes) {
      axios.get(`https://project-henry-videogames-production.up.railway.app/videogame/${id}`).then((response) => {
        setVideoGamesDb(response.data);
      });
    }
  }, [id, hasMultipleDashes]);

  if (!videoGames && !videoGamesDb) {
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
  } else {
    if (videoGames) {
      return (
        <div key={videoGames.name} className={styles.container_videoGame}>
          <div className={styles.container_image}>
            <img src={videoGames.background_image} alt={videoGames.name} />
          </div>

          <div className={styles.container_info_videoGame}>
            <img
              width={200}
              src={videoGames.background_image}
              alt={videoGames.name}
            />

            <div className={styles.container_info_videoGame_text}>
              <h2>{videoGames.name}</h2>

              <div className={styles.container__rating__released}>
                <p className={styles.container_info_videoGame_text__rating}>
                  <b>{videoGames.rating}</b> / 5{" "}
                  {(Math.floor(videoGames.rating) === 1 && arrayStars[0]) ||
                    (Math.floor(videoGames.rating) === 2 &&
                      arrayStars[0] + arrayStars[1]) ||
                    (Math.floor(videoGames.rating) === 3 &&
                      arrayStars[0] + arrayStars[1] + arrayStars[2]) ||
                    (Math.floor(videoGames.rating) >= 4 &&
                      arrayStars[0] +
                        arrayStars[1] +
                        arrayStars[2] +
                        arrayStars[3])}
                </p>

                <h3>{videoGames.released} 📅</h3>
              </div>

              <p className={styles.container__description}>
                {videoGames.description_raw}
              </p>

              <div className={styles.container__platforms__genres}>
                <div
                  className={styles.container_info_videoGame_text__platforms}
                >
                  {videoGames &&
                    videoGames.platforms
                      .slice(0, 4)
                      .map((platf) => (
                        <h2 key={platf.platform.id}> {platf.platform.name}</h2>
                      ))}
                </div>

                <div className={styles.container_info_videoGame_text__genres}>
                  {videoGames.genres &&
                    videoGames.genres.map((date) => (
                      <h2 key={date.name}>{date.name}</h2>
                    ))}
                </div>
              </div>

              <Link to="/home">
                <button className={styles.nav_button}>Atras</button>
              </Link>
            </div>
          </div>
        </div>
      );
    } else if (videoGamesDb) {
      return (
        <div key={videoGamesDb.name} className={styles.container_videoGame}>
          <div className={styles.container_image}>
            <img src={videoGamesDb.background_image} alt={videoGamesDb.name} />
          </div>

          <div className={styles.container_info_videoGame}>
            <img
              width={200}
              src={videoGamesDb.background_image}
              alt={videoGamesDb.name}
            />

            <div className={styles.container_info_videoGame_text}>
              <h2>{videoGamesDb.name}</h2>

              <div className={styles.container__rating__released}>
                <p className={styles.container_info_videoGame_text__rating}>
                  <b>{videoGamesDb.rating}</b> / 5{" "}
                  {(Math.floor(videoGamesDb.rating) === 1 && arrayStars[0]) ||
                    (Math.floor(videoGamesDb.rating) === 2 &&
                      arrayStars[0] + arrayStars[1]) ||
                    (Math.floor(videoGamesDb.rating) === 3 &&
                      arrayStars[0] + arrayStars[1] + arrayStars[2]) ||
                    (Math.floor(videoGamesDb.rating) >= 4 &&
                      arrayStars[0] +
                        arrayStars[1] +
                        arrayStars[2] +
                        arrayStars[3])}
                </p>

                <h3>{videoGamesDb.released} 📅</h3>
              </div>

              <p className={styles.container__description}>
                {videoGamesDb.description}
              </p>

              <div className={styles.container__platforms__genres}>
                <div
                  className={styles.container_info_videoGame_text__platforms}
                >
                  {videoGamesDb &&
                    videoGamesDb.platforms
                      .slice(0, 4)
                      .map((platf) => <h2 key={platf}> {platf}</h2>)}
                </div>

                <div className={styles.container_info_videoGame_text__genres}>
                  {videoGamesDb.genres &&
                    videoGamesDb.genres.map((date) => (
                      <h2 key={date.name}>{date.name}</h2>
                    ))}
                </div>
              </div>

              <Link to="/home">
                <button className={styles.nav_button}>Atras</button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    videoGamesApi: state.videoGamesApi,
  };
};

export default connect(mapStateToProps)(Detail);
