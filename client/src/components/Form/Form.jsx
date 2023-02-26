// importar las dependencias necesarias
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  isValidURL,
  isValidDate,
  validateInputDescription,
  validateInputName,
} from "./validaciones";

function validate(inputs) {
  let errors = {};

  if (!validateInputName(inputs.name)) {
    errors.name =
      "Debe ingresar un nombre mayor a 3 caracteres y menor a 30 caracteres";
  } else if (!validateInputDescription(inputs.description)) {
    errors.description =
      "La descripcion debe ser mayor a 5 caracteres y menor a 200 caracteres";
  } else if (!isValidDate(inputs.released)) {
    errors.released = "Debe colocar una fecha correcta, ejemplo: 2023-03-22";
  } else if (!isValidURL(inputs.background_image)) {
    errors.background_image = "La URL no es válida o no es una imagen JPG";
  }

  return errors;
}

const Form = () => {

    const [rangeValue, setRangeValue] = useState(1);

  // ESTADO PARA GUARDAR DE AXIOS LOS DATOS DE LA API, QUE VAN A SER LOS GENEROS
  const [genreApi, setGenreApi] = useState();

  useEffect(() => { axios.get("https://api.rawg.io/api/genres?key=28d152a4795c4f858cae0c606a326643").then((response) => setGenreApi(response.data.results)) }, [])

  const platforms = [
    "PC",
    "PlayStation 5",
    "PlayStation 4",
    "Xbox One",
    "Xbox Series S/X",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo 3DS",
    "Nintendo DS",
    "Nintendo DSi",
    "macOS",
    "Linux",
    "Xbox 360",
    "Xbox",
    "PlayStation 3",
    "PlayStation 2",
    "PlayStation",
    "PS Vita",
    "PSP",
    "Wii U",
    "Wii",
    "GameCube",
    "Nintendo 64",
    "Game Boy Advance",
    "Game Boy Color",
    "Game Boy",
    "SNES",
    "NES",
    "Classic Macintosh",
    "Apple II",
    "Commodore / Amiga",
    "Atari 7800",
    "Atari 5200",
    "Atari 2600",
    "Atari Flashback",
    "Atari 8-bit",
    "Atari ST",
    "Genesis",
    "SEGA Saturn",
    "Neo Geo",
    "Jaguar",
    "3DO",
  ];

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    released: "",
    background_image: "",
  });

  //Estado que guardará los values de los inputs
  const [valuesArray, setValuesArray] = useState([]);

  //Función que se ejecutará cada vez que cambie algún input
  const changeValue = (event) => {
    event.persist(); // Necesario para manterner el valor de 'e'

    let newValues;
    if (event.target.checked) {
      // Si se ha marcado el checkbox
      newValues = [...valuesArray, event.target.value];
    } else {
      // Si no se ha marcado el checkbox
      newValues = valuesArray.filter((v) => v !== event.target.value);
    }
    setValuesArray(newValues);
    setFormData({ ...formData, genres: newValues });
  };

  // console.log(valuesArray)

  const [values, setValues] = useState([]);


  const handleChangeRating = (e) =>{

    setRangeValue(e.target.value);
    setFormData({ ...formData, rating:  parseFloat(rangeValue) })



  }

  const handleChangeCheckBox = (e) => {
    e.persist(); // Necesario para manterner el valor de 'e'

    let newValues;
    if (e.target.checked) {
      // Si se ha marcado el checkbox
      newValues = [...values, e.target.value];
    } else {
      // Si no se ha marcado el checkbox
      newValues = values.filter((v) => v !== e.target.value);
    }
    setValues(newValues);
    setFormData({ ...formData, platforms: newValues });
  };

  // Establecer el estado para guardar los valores de los campos de formulario
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    platforms: [],
    genres: [],
    background_image: "",
  });

  // Función que se ejecuta cuando se submit el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Enviar la solicitud POST a la API
      const response = await axios.post(
        "http://localhost:3001/videogames",
        formData
      );
      console.log(formData);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }

    console.log(formData);
  };

  // Función que se ejecuta cada vez que se actualiza un campo de formulario
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });

    setErrors(
      validate({ ...formData, [event.target.name]: event.target.value })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        required
        value={formData.name}
        placeholder="Name VideoGame"
        onChange={handleChange}
      />
      {errors.name && <p>{errors.name}</p>}

      <input
        type="text"
        name="description"
        required
        value={formData.description}
        placeholder="description"
        onChange={handleChange}
      />
      {errors.description && <p>{errors.description}</p>}

      <input
        type="text"
        name="released"
        required
        value={formData.released}
        placeholder="Example: 2005-05-22"
        onChange={handleChange}
      />

      {errors.released && <p>{errors.released}</p>}

      <input
        type="url"
        name="background_image"
        required
        value={formData.background_image}
        placeholder="background_image"
        accept="image/jpeg"
        multiple
        onChange={handleChange}
      />
      {errors.background_image && <p>{errors.background_image}</p>}



<div>

      <input
  type="range"
  name="rating"
  min={1}
  max={10}
  step={0.1}
  value={rangeValue}
  onChange={handleChangeRating}
/>
<p>Valor actual: {rangeValue}</p>



</div>


      {platforms &&
        platforms.map((plform) => (
          <div key={plform}>
            <input
              type="checkbox"
              name="platforms"
              value={plform}
              onChange={handleChangeCheckBox}
            />{" "}
            {plform}
            <br />
          </div>
        ))}

      <div>
        


{genreApi && genreApi.map(genre => 


<div key={genre.name}>
            <input
            
              type="checkbox"
              name={genre.name}
              value={genre.name}
              onChange={changeValue}
            />{" "}
            {genre.name}
            <br />
          </div>)

}



        
      </div>
      {Object.keys(errors).length === 0 && formData.platforms.length !== 0 && formData.genres.length !== 0 && (
        <button type="submit">Create</button>
      )}
    </form>
  );
};

export default Form;
