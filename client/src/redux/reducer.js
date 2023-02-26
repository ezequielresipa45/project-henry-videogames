// Inicializamos el estado de objetos.
const initialState = {
  videoGamesApi: [],
};

// El encargado de enviarle al state nuestros pedidos o cambios que querramos hacer.
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_VIDEOGAMES_API":
      return {
        ...state,
        videoGamesApi: [...state.videoGamesApi, action.payload],
      };

    case "GET_VIDEOGAMES_DB":
      return {
        ...state,
        videoGamesApi: [...state.videoGamesApi, action.payload],
        
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
