import axios from "axios";

export const getVideoGamesApi = (url) => {
  return async function (dispatch) {
    await axios
      .get(url)
      .then((response) =>
        dispatch({ type: "GET_VIDEOGAMES_API", payload: response.data.results })
      );
  };
};

export const getVideoGamesDb = () => {
  return async function (dispatch) {
    await axios
      .get("http://localhost:3001/videogames")
      .then((response) =>
        dispatch({ type: "GET_VIDEOGAMES_DB", payload: response.data })
      );
  };
};


export const orderByAz = ()=> {
  return{
    type: "ORDER_BY_AZ"
  }
}

export const orderByZa = ()=> {
  return{
    type: "ORDER_BY_ZA"
  }
}

export const searchVideoGames = (name)=> {
  return{
    type: "SEARCH_VIDEO_GAMES",
    payload: name,
  }
}





/*
export const addPersonaje = (name) => {
  return {
    type: "ADD_PERSONAJE",
    payload: name,
  };
};

export const deletePersonaje = (id) => {
  return {
    type: "DELETE_PERSONAJE",
    payload: id,
  };
};

export const filterCards = (status) => {
  return {
    type: "FILTER",
    payload: status,
  };
};
*/
