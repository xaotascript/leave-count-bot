const Sequelize = require("sequelize");
const Chat = require('./models/Chat');
const ChatUser = require('./models/ChatUser');
const Date = require('./models/Date');
const User = require('./models/User');
const createRelations = require('./models/relations');
const {
  database,
  host,
  port,
  user,
  password
} = require("./config.json");

const sequelizeConnection = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const db = {
  Sequelize,
  sequelize: sequelizeConnection,
  Chat: Chat(sequelizeConnection, Sequelize),
  ChatUser: ChatUser(sequelizeConnection, Sequelize),
  Date: Date(sequelizeConnection, Sequelize),
  User: User(sequelizeConnection, Sequelize)
};

createRelations(db);

(async () => {
  try {
    await db.sequelize.authenticate();
    db.sequelize.sync();
    db.Chat.findAll().then(console.log).catch(console.log);
  } catch(e) {
    console.log(e);
  }
})();

module.exports = db;
