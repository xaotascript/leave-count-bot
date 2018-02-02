const Date = (sequelize, DataTypes) => 
sequelize.define(
  'Date',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'You need to set a date'
        }
      }
    }
  }
);

module.exports = Date;