const DiscordStrategy = require("passport-discord").Strategy;
const refresh = require("passport-oauth2-refresh");
const passport = require("passport");
const DiscordUser = require("../db/models/DiscordUser");

// constants
const scopes = ["identify", "email", "guilds", "guilds.join"];
const prompt = "consent";

// strategy
const strategy = new DiscordStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: scopes,
  },
  async (accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    try {
      const findUser = await DiscordUser.findOneAndUpdate(
        {
          discordId: profile.id,
        },
        {
          discordTag: `${profile.username}#${profile.discriminator}`,
          avatar: profile.avatar,
          guilds: profile.guilds,
        },
        { new: true }
      );
      if (findUser) {
        console.log(`Existed access: ${findUser.discordId}`);
        return done(null, findUser);
      } else {
        const newUser = await DiscordUser.create({
          discordId: profile.id,
          discordTag: `${profile.username}#${profile.discriminator}`,
          avatar: profile.avatar,
          guilds: profile.guilds,
        });
        const savedUser = await newUser.save();
        console.log(`New access: ${savedUser.discordId}`);
        return done(null, savedUser);
      }
    } catch (error) {
      console.log(error);
      return done(error, null);
    }
  }
);

passport.serializeUser((user, done) => {
  done(null, user.discordId);
});

passport.deserializeUser(async (discordId, done) => {
  try {
    const user = await DiscordUser.findOne({ discordId });
    return user ? done(null, user) : done(null, null);
  } catch (error) {
    done(error, null);
  }
});

passport.use(strategy);
refresh.use(strategy);
