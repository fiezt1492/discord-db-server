const router = require("express").Router();
const { getBotGuilds, getBotUser } = require("../utils/api");
const DiscordUser = require("../db/models/DiscordUser");
const { getMutualGuilds } = require("../utils/utils");

router.get("/guilds", async (req, res) => {
  try {
    const guilds = await getBotGuilds();
    const user = await DiscordUser.findOne({ discordId: req.user.discordId });
    if (user) {
      const userGuilds = user.get("guilds");
      const mutualGuilds = getMutualGuilds(userGuilds, guilds);
      res.send(mutualGuilds);
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/bot", async (req, res) => {
  try {
    const user = await getBotUser();
    if (user) {
      res.send(user);
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
