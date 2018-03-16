require('dotenv').config();
const Telegraf = require("telegraf");
const {init: initDb, writeLeave, getDaysWithoutLeaving} = require('./db');
const {getImgUrl} = require('./utils');
const runCron = require('./cron');


const token = process.env.BOT_TOKEN;
const botName = process.env.BOT_NAME || 'LeaveCountBot';

const bot = new Telegraf(token, {username: botName});

bot.on('left_chat_member', async (ctx) => {
  if (ctx.message.left_chat_member.is_bot) {
    return;
  }

  const {
    chat: {
      id: chatId,
    },
    left_chat_member: {
      id: userId,
      first_name: userFirstName,
      username,
    }
  } = ctx.message;
  
  await writeLeave(chatId, userId, userFirstName, username);

  return ctx.replyWithPhoto({url: getImgUrl()});
});

bot.command('leave_stats', async (ctx) => {
  const daysWithoutLeaving = await getDaysWithoutLeaving(ctx.chat.id);
  const imgUrl = getImgUrl(daysWithoutLeaving);
  return ctx.replyWithPhoto({url: imgUrl});
});

(async () => {
  await initDb();
  await runCron(bot.telegram);
  bot.startPolling();
})();
