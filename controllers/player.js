const express = require("express");
const Player = require("../models/Player");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", async (req, res, next) => {
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

router.put("/:id", auth, async (req, res) => {
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
router.delete("/:id/games", auth, async (req, res) => {
	const { id } = req.params;
	try {
		const game = await Player.findByIdAndDelete(id);
		if (!game) {
			res.status(404).json({ message: "No rolls found with this given" + id });
		}
		res.send(game);
	} catch (err) {
		res.status(404).send({ error: err.message });
	}
});
module.exports = router;
