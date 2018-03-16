const memeUrl = 'http://bots.pashutk.ru:8081/';

module.exports = {
  getImgUrl: daysWithoutLeaving => daysWithoutLeaving ? `${memeUrl}?days=${daysWithoutLeaving}` : memeUrl,
};
