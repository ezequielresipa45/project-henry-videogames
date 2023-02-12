const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Videogame", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING(20),
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      allowNull: false,
    },
    create:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,

    },
    background_image:{
      type: DataTypes.STRING,
      defaultValue: "https://blog.ida.cl/wp-content/uploads/sites/5/2020/05/ida-uxvideojuegos-blog-1024x735.png",
      allowNull: false,
    }
  }, { timestamps: false });
};

