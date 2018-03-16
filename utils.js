require('dotenv').config();


const memeUrl = process.env.MEME_URL || 'http://bots.pashutk.ru:8081/';

module.exports = {
  getImgUrl: daysWithoutLeaving => daysWithoutLeaving ? `${memeUrl}?days=${daysWithoutLeaving}` : memeUrl,
};
