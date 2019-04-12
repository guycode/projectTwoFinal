module.exports = function (sequelize, DataTypes) {
  var tasks = sequelize.define("tasks", {
      task_date: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      task_minutes: {
          type: DataTypes.SMALLINT,
          allowNull: false,
      },
      task_category: {
          type: DataTypes.STRING,
          allowNull: false
      },
      task_goal: {
          type: DataTypes.SMALLINT,
          allowNull: false
      }
  });

  return tasks;
};