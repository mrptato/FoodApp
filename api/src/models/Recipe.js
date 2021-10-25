const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.



module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define('recipe', {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    summary: { type: DataTypes.STRING, allowNull: true },
    score: { type: DataTypes.INTEGER, allowNull: true },
    healthy: { type: DataTypes.INTEGER, allowNull: true },
    steps: { type: DataTypes.STRING, allowNull: true },
    price: {type: DataTypes.INTEGER, allowNull: true},
    own: { type: DataTypes.BOOLEAN, defaultValue: true }
  },
    {
      timestamps: false,
    }),

    sequelize.define('diet_type', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    },
      {
        timestamps: false,
      })
};
