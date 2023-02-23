import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import axios from "axios";


function Detail() {


    const { id } = useParams();


    const [videoGames, setVideoGames] = useState();
    const [videoGamesDb, setVideoGamesDb] = useState();



    let hasMultipleDashes = false;

// Esto comprueba si el argumento id contiene dos o más guiones. Si es así, la variable hasMultipleDashes tendrá un valor de true. Lo hago para saber si el ID recibido es el de la base de datos o de la api.

    if (id.match(/-+/g) !== null && id.match(/-+/g).length > 1) {
        hasMultipleDashes = true;
    }



    useEffect(() => {

        if (!hasMultipleDashes) {
            axios.get(`https://api.rawg.io/api/games/${id}?key=7766812f293742f8a1efa2ac33903b70`).then(response => {

                setVideoGames(response.data)


            })

        }
    }, [id, hasMultipleDashes])







    useEffect(() => {
        if (hasMultipleDashes) {

            axios.get(`http://localhost:3001/videogame/${id}`).then(response => {

                setVideoGamesDb(response.data)


            })



        }

    }, [id, hasMultipleDashes])





    if (!videoGames && !videoGamesDb) {

        return (
            <h2>Cargando...</h2>
        )

    }



    else {



        if (videoGames) {

            return (
                <div key={videoGames.name}>
                    <h2>{videoGames.name}</h2>
                    <img width={200} src={videoGames.background_image} alt={videoGames.name} />
                    <p>{videoGames.description_raw}</p>
                    <h3>{videoGames.rating}</h3>
                    <h3>{videoGames.released}</h3>

                    {videoGames.platforms && videoGames.platforms.map(platf => <h2 key={platf.platform.id}> {platf.platform.name}</h2>)}




                    {videoGames.genres && videoGames.genres.map(date => <h2 key={date.name}>{date.name}</h2>)}
                    <Link to="/home">
                        <button className="nav-button">Atras</button>
                    </Link>
                </div>
            )
        }


        else if (videoGamesDb) {
            return (
                <div key={videoGamesDb.name}>
                    <h2>{videoGamesDb.name}</h2>
                    <img width={200} src={videoGamesDb.background_image} alt={videoGamesDb.name} />
                    <p>{videoGamesDb.description}</p>
                    <h3>{videoGamesDb.rating}</h3>
                    <h3>{videoGamesDb.released}</h3>


                    {videoGamesDb.platforms && videoGamesDb.platforms.map(platf => <h2 key={platf}> {platf}</h2>)}


                    {videoGamesDb.genres && videoGamesDb.genres.map(date => <h2 key={date.name}>{date.name}</h2>)}
                    <Link to="/home">
                        <button className="nav-button">Atras</button>
                    </Link>
                </div>
            )
        }





    }

}


const mapStateToProps = (state) => {
    return {

        videoGamesApi: state.videoGamesApi
    };
};








export default connect(mapStateToProps)(Detail);