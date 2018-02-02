const Chat = (sequelize, DataTypes) => 
  sequelize.define(
    'Chat',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true
      },
      chatId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            message: 'You need to set a chatId'
          }
        }
      }
    }
  );

module.exports = Chat;