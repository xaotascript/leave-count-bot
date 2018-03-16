require('dotenv').config();
const Sequelize = require("sequelize");
const LeaveModel = require('./models/Leave');


const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: 'postgresql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const Leave = LeaveModel(sequelize, Sequelize);

module.exports = {
  init: async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
    } catch(e) {
      console.log(e);
    }
  },

  writeLeave: async (chatId, userId, userFirstName, username) => {
    await Leave.create({chatId, userId, userFirstName, username});
  },

  getDaysWithoutLeaving: async (chatId) => {
    const lastLeave = await Leave.findOne({
      where: {chatId},
      order: [['createdAt', 'DESC']],
    });
    
    if (!lastLeave) {
      return 0;
    }

    const now = +new Date();
    const leave = +lastLeave.createdAt;
    
    const nowDay = now / 1000 / 60 / 60 / 24;
    const leaveDay = leave / 1000 / 60 / 60 / 24;

    const daysDelta = (nowDay - leaveDay) >> 0;
    return daysDelta < 0 ? 0 : daysDelta;
  },

  getAllChatIds: async () => Leave.findAll({
    attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('chatId')) ,'chatId']],
  }).map(x => parseInt(x.chatId, 10)),
};
