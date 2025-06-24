import sequelize from "../config/db.js";
import { DataTypes } from "sequelize"

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false

  },

  status: {
    type: DataTypes.STRING,
    defaultValue: 'To Do'
  },
  user_id: DataTypes.INTEGER
});
Task.associate = (models) => {
  Task.belongsTo(models.User, { foreignKey: 'user_id' });
};


export default Task