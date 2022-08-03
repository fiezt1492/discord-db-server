require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const routes = require("./routes");

//passport
const passport = require("passport");
const discordStrategy = require("./strategies/discord");

// db connect
try {
  mongoose.connect(process.env.MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("[DB] Connected.");
} catch (error) {
  console.log(`[DB] ${error}`);
}

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// session
app.use(
  session({
    secret: "itsfiezthere",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
    name: "discord.oauth2",
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_CONNECT,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

// listening to things
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Listening on ${PORT}`);
});
