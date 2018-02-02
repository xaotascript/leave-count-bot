const User = (sequelize, DataTypes) => 
sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'You need to set a userId'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
    },
    nickname: {
      type: DataTypes.STRING,
    }
  }
);

module.exports = User;