function getMutualGuilds(userGuilds, botGuilds) {
  // return userGuilds.filter((userGuild) =>
  //   botGuilds.find(
  //     (botGuild) =>
  //       botGuild.id === userGuild.id && (userGuild.permissions & 0x20) === 0x20
  //   )
  // );

  const validGuilds = userGuilds.filter(
    (userGuild) => (userGuild.permissions & 0x20) === 0x20
  );
  const included = [];
  const excluded = validGuilds.filter((guild) => {
    const findGuild = botGuilds.find((g) => g.id === guild.id);
    if (!findGuild) return guild;
    included.push(findGuild);
  });

  return { excluded, included };
}

module.exports = { getMutualGuilds };
