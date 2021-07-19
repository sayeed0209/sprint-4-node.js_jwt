const express = require("express");
const Game = require("../models/Game");
const Player = require("../models/Player");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/:id/games", auth, async (req, res) => {
	const a = Math.floor(Math.random() * 7) + 1;
	const b = Math.floor(Math.random() * 7) + 1;
	const result = a + b;
	let won = 0;
	if (result === 7) won = 1;
	const game = new Game({
		owner: req.params.id,
		dice1: a,
		dice2: b,
		won: won,
	});
	await game.save();
	const games = await Player.findById({ _id: game.owner });
	games.games.push(game);
	await games.save();
	res.json(game);
});
router.get("/:id/games", auth, async (req, res) => {
	const player = await Player.findById({ _id: req.params.id }).populate(
		"games"
	);
	try {
		if (player) res.status(200).json(player);
	} catch (e) {
		res.status(404).send(e.message);
	}
});
router.get("/", auth, async (req, res) => {
	const avgScore = await Game.aggregate([
		{
			$group: {
				_id: "$owner",
				average: { $avg: "$won" },
			},
		},
	]);

	res.json(avgScore);
});

module.exports = router;
