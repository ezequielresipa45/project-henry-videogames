// Inicializamos el estado de objetos.
const initialState = {
  videoGamesApi: [],
  videoGamesSearch: [],
};

// El encargado de enviarle al state nuestros pedidos o cambios que querramos hacer.
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_VIDEOGAMES_API":
      return {
        ...state,
        videoGamesApi: [...state.videoGamesApi.concat(action.payload)],
      };

    case "GET_VIDEOGAMES_DB":
      return {
        ...state,
        videoGamesApi: [...state.videoGamesApi.concat(action.payload)],
      };

    case "ORDER_BY_AZ":
      return {
        ...state,
        videoGamesApi: [
          ...state.videoGamesApi.sort((a, b) => a.name.localeCompare(b.name)),
        ],

        videoGamesSearch: [
          ...state.videoGamesSearch.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        ],
      };

    case "ORDER_BY_ZA":
      return {
        ...state,
        videoGamesApi: [
          ...state.videoGamesApi.sort((a, b) => b.name.localeCompare(a.name)),
        ],

        videoGamesSearch: [
          ...state.videoGamesSearch.sort((a, b) =>
            b.name.localeCompare(a.name)
          ),
        ],
      };

    case "SEARCH_VIDEO_GAMES":
      return {
        ...state,
        videoGamesSearch: [
          ...state.videoGamesApi.filter((videogame) =>
            videogame.name.toLowerCase().includes(action.payload)
          ),
        ],
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
