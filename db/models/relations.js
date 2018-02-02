const relations = ({Chat, ChatUser, Date, User}) => {
  Chat.belongsToMany(User, {
    as: 'Users',
    through: {
      model: ChatUser,
      unique: false
    }, 
    foreignKey: 'chatId'
  });

  User.belongsToMany(Chat, {
    as: 'Chats',
    through: {
      model: ChatUser,
      unique: false
    },
    foreignKey: 'userId'
  });

  ChatUser.hasMany(Date, {
    as: 'Dates',
    foreignKey: {allowNull: false},
    foreignKeyConstraint: true
  });

  Date.belongsTo(ChatUser, {
    as: 'ChatUser'
  });
};

module.exports = relations;