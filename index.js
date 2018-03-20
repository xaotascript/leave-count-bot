require('dotenv').config();
const Telegraf = require("telegraf");
const {init: initDb, writeLeave, getLastLeave, getDaysWithoutLeaving} = require('./db');
const {getImgUrl} = require('./utils');
const runCron = require('./cron');


const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token);

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

bot.command('who', async ctx => {
  const lastLeave = await getLastLeave(ctx.chat.id);

  if (!lastLeave) {
    return ctx.reply('Никто не ливал');
  }

  return ctx.reply(`Последний ливнувший – ${lastLeave.userFirstName} (@${lastLeave.username})`);
});

bot.command('leave_stats', async (ctx) => {
  const daysWithoutLeaving = await getDaysWithoutLeaving(ctx.chat.id);
  const imgUrl = getImgUrl(daysWithoutLeaving);
  return ctx.replyWithPhoto({url: imgUrl});
});

(async () => {
  await initDb();

  await runCron(bot.telegram);

  const botInfo = await bot.telegram.getMe();
  if (botInfo) {
    bot.options.username = botInfo.username;
  }

  bot.startPolling();
})();
