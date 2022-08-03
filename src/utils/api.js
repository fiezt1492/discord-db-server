const fetch = require('node-fetch');
const TOKEN = process.env.BOT_TOKEN;

async function getBotGuilds() {
  const res = await fetch("http://discord.com/api/v10/users/@me/guilds", {
    method: "GET",
    headers: {
      Authorization: `Bot ${TOKEN}`,
    },
  });

  return res.json();
}

async function getBotUser() {
  const res = await fetch("http://discord.com/api/v10/users/@me", {
    method: "GET",
    headers: {
      Authorization: `Bot ${TOKEN}`,
    },
  });

  return res.json();
}

module.exports = { getBotGuilds, getBotUser };
