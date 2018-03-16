const CronJob = require('cron').CronJob;
const {getAllChatIds, getDaysWithoutLeaving} = require('./db');
const {getImgUrl} = require('./utils');


const cronJob = async telegramInstance => {
  const chatIds = await getAllChatIds();
  await Promise.all(chatIds.map(async chatId => {
    const daysWithoutLeaving = await getDaysWithoutLeaving(chatId);
    const imgUrl = getImgUrl(daysWithoutLeaving);
    return telegramInstance.sendPhoto(chatId, {url: imgUrl});
  }));
};

module.exports = async telegramInstance => {
  new CronJob('0 0 0 * * *', _ => {
    cronJob(telegramInstance).then(_ => console.log('Cron job completed')).catch(err => console.error(err));
  }, null, true, 'Europe/Moscow');
};
