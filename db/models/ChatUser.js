const ChatUser = (sequelize, DataTypes) => 
sequelize.define(
  'ChatUser',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
  }
);

module.exports = ChatUser;