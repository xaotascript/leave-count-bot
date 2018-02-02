// const fs = require("fs-extra");
// const {file, meme} = require("./config.json");

// const wiriteLeave = async (chatId) => {
//   try {
//     const rawLeaves = await fs.readFile(file);
//     const date = new Date();
//     const leaves = JSON.parse(rawLeaves);
    
//     leaves[chatId] = date;
//     await fs.writeFile('./leaves.json', JSON.stringify(leaves));

//     return true;
//   } catch(e) {
//     return false;
//   }
// }

// const getLeavesStats = async (chatId) => {
//   try {
//     const rawLeaves = await fs.readFile(file);
//     const leaves = JSON.parse(rawLeaves);

//     return leaves[chatId];
//   } catch(e) {
//     return false;
//   }
// }

// const getMeme = () => fs.createReadStream(meme);

// module.exports = {
//   wiriteLeave,
//   getLeavesStats,
//   getMeme
// };

const db = require('./../db');

const writeLeave = (chatId, userId, username, nickname) => {
  
};
