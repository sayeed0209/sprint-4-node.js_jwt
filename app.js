const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Player = require("./models/Player");
const auth = require("./middleware/auth");
const PORT = 8000;
require("dotenv").config();
mongoose.connect("mongodb://localhost:27017/diceRoll", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});
app.use(express.json());
app.get("/", (req, res) => {
	res.send("hola");
});
app.post("/create", async (req, res, next) => {
	Player.checkExistingPlayer(req.body.username, async function (error, user) {
		if (error) {
			return next(error);
		}
		if (user) {
			// Tell client that the username already exist.
			res.status(401).json({ error: "Player with username already found" });
		} else {
			const player = new Player(req.body);
			// Code if no user with entered user was found.
			await player.save();
			const token = await player.generateAuthToken();
			res
				.status(201)
				.json({ message: "Successfully created account.", player, token });
		}
	});
});

app.get("/player/:id", auth, async (req, res) => {
	const updates = Object.keys(req.body);
	console.log(updates.includes("username"));
	if (!updates.includes("username")) {
		return res.status(400).send({ error: "Invalid updates!" });
	}

	try {
		// req.user.username = req.body.username;
		updates.forEach(update => (req.user[update] = req.body[update]));
		await req.user.save();
		res.send(req.user);
	} catch (e) {
		res.status(400).send(e);
	}
});

app.listen(PORT, () => {
	console.log("App runing on port " + PORT);
});
