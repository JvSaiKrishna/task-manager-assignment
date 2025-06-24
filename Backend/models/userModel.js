import sequelize from "../config/db.js";
import { DataTypes } from "sequelize"

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false

  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false

  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
});
User.associate = (models) => {
  User.hasMany(models.Task, { foreignKey: 'user_id' });
};

export default User
