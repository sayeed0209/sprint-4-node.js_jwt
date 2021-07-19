const express = require("express");
const app = express();
const mongoose = require("mongoose");
const playerRouter = require("./controllers/player");
const gameRouter = require("./controllers/game");
const rankingRouter = require("./controllers/ranking");

const PORT = 8000;
require("dotenv").config();
mongoose.connect("mongodb://localhost:27017/diceRoll", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});
app.use(express.json());
app.use("/players", playerRouter);
app.use("/players", gameRouter);
app.use("/ranking", rankingRouter);

app.listen(PORT, () => {
	console.log("App runing on port " + PORT);
});
