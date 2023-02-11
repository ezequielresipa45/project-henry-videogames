import axios from "axios";


// export const addPersonaje = (name) => {
//     return {
//       type: "ADD_PERSONAJE",
//       payload: name,
//     };
//   };


/*
const addGenresDb = async (name) => {
  const newData = await Genre.create({ name });

  return newData;
};
*/ 





// (async function traerDatosDeLaApi() {
//   const data = await axios(
//     "https://api.rawg.io/api/games?key=af54471906e14994b0dc11a4eb9d209d"
//   );

// //   let datosApis = data.data.results;

// console.log(data.data.results)
// //   datosApis.map((date) => {
// //     addGenresDb(date.name);
// //   });
// })();






//"https://api.rawg.io/api/games?key=af54471906e14994b0dc11a4eb9d209d"

export const getVideoGamesApi = (url) => {
  return async function (dispatch) {
    await axios
      .get(url)
      .then((response) =>
        dispatch({ type: "GET_VIDEOGAMES_API", payload: response.data.results })
      );
  };
};















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