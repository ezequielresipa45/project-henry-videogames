// importar las dependencias necesarias
import React, { useState } from "react";
import axios from "axios";

const FormUser = () => {




    //Estado que guardará los values de los inputs
    const [valuesArray, setValuesArray] = useState([]);

    //Función que se ejecutará cada vez que cambie algún input
    const changeValue = (event) => {
        //Guardamos el value actual del input
        const currentValue = event.target.value;

        // Comprobamos si el value esta ya dentro del array de values
        let isInArray = false;

        for (let i = 0; i < valuesArray.length; i++) {
            if (currentValue === valuesArray[i]) {
                isInArray = true;
                break;
            }
        }

        // Si no está en el array lo guardamos
        if (!isInArray) {
            let newArray = valuesArray;
            newArray.push(currentValue);
            setValuesArray(newArray);

        }

    }

    // console.log(valuesArray)



    const [values, setValues] = useState([]);

    const handleChangeCheckBox = (e) => {
        e.persist();  // Necesario para manterner el valor de 'e'

        let newValues;
        if (e.target.checked) { // Si se ha marcado el checkbox
            newValues = [...values, e.target.value];
        } else { // Si no se ha marcado el checkbox
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
        platforms: '',
        genres: valuesArray,
        background_image: ""

    });

    // Función que se ejecuta cuando se submit el formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        // try {
        //   // Enviar la solicitud POST a la API
        //   // SI EL APELLIDO YA EXISTE, ARROJA UN ERROR
        //   const response = await axios.post(
        //     "http://localhost:3001/videogames",
        //     formData
        //   );
        //   console.log(response.data);
        // } catch (error) {
        //   console.error(error);
        // }


        console.log(formData)


    };

    // Función que se ejecuta cada vez que se actualiza un campo de formulario
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
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
            <input
                type="text"
                name="description"
                required
                value={formData.description}
                placeholder="description"
                onChange={handleChange}
            />
            <input
                type="text"
                name="released"
                required
                value={formData.released}
                placeholder="released"
                onChange={handleChange}
            />
            <input
                type="text"
                name="background_image"
                required
                value={formData.background_image}
                placeholder="background_image"
                onChange={handleChange}
            />
            <input
                type="number"
                name="rating"
                required
                value={formData.rating}
                placeholder="rating"
                onChange={handleChange}
            />

            <div>
                <input type="checkbox" name="platforms" value="PS2" onChange={handleChangeCheckBox} /> PS2<br />
                <input type="checkbox" name="platforms" value="PS3" onChange={handleChangeCheckBox} /> PS3<br />
                <input type="checkbox" name="platforms" value="PS4" onChange={handleChangeCheckBox} /> PS4<br />
                <input type="checkbox" name="platforms" value="PC" onChange={handleChangeCheckBox} /> PC<br />

                {/* Muestra los valores guardados para fines de depuración */}
                <p>Los valores guardados son {JSON.stringify(values)}</p>
            </div>




{/* {values && values.map(v => <h3>{v}</h3>)} */}


            <div>
                <select onChange={changeValue}>
                    <option value="action">action</option>
                    <option value="rpg">rpg</option>
                    <option value="adventure">adventure</option>
                </select>
            </div>

            <button type="submit">Create</button>
        </form>
    );
};

export default FormUser;