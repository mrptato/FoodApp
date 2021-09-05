const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.



module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define('recipe', {
    name: { type: DataTypes.STRING, allowNull: false },
    summary: { type: DataTypes.STRING, allowNull: false },
    score: { type: DataTypes.INTEGER, allowNull: false },
    healthy: { type: DataTypes.BOOLEAN, allowNull: false },
    steps: { type: DataTypes.STRING, allowNull: false },
    own: { type: DataTypes.BOOLEAN, default: true }
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
