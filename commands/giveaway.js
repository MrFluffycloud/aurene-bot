const fs = require("fs");
const entries = JSON.parse(fs.readFileSync("./giveawayData.json", "utf8"));

module.exports = {
  name: "giveaway",
  aliases: ["giffaway", "lottery", "fortunetest"],
  description: "Create, enter and view giveaways",
  args: true,
  usage: "enter OR create",
  execute(message, args) {
    try {
      const entryCheck = entries[message.author.id];
      const activeGiveaway = entries["currentGiveaway"];
      if (args[0] === "create") {
        if (!activeGiveaway) {
          entries["currentGiveaway"] = {
            userId: message.author.id,
            username: message.author.username,
            discriminator: message.author.discriminator,
            creatingTime: `${message.createdAt}`,
          };
          fs.writeFile("./giveawayData.json", JSON.stringify(entries, null, "\t"));
          return message.reply("you are creating a giveaway!");
        }
        return message.reply("please wait for the ongoing giveaway to end.");
      } else if (args[0] === "enter") {
        if (!entryCheck) {
          entries[message.author.id] = {
            username: message.author.username,
            discriminator: message.author.discriminator,
            entryTime: `${message.createdAt}`,
          };
          fs.writeFile("./giveawayData.json", JSON.stringify(entries, null, "\t"));
          return message.reply(`You have entered the giveaway as ${message.author.username}#${message.author.discriminator}!`);
        }
        return message.reply("You've already entered this giveaway!");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
