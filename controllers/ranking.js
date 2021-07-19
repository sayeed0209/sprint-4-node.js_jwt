const express = require("express");
const Game = require("../models/Game");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
	const avgScore = await Game.aggregate([
		{
			$group: {
				_id: "$owner",
				played: { $sum: 1 },
				avgSuccessRate: { $avg: "$won" },
			},
		},
		{ $sort: { avgSuccessRate: -1 } },
	]);

	res.json(avgScore);
});
router.get("/winner", auth, async (req, res) => {
	const avgScore = await Game.aggregate([
		{
			$group: {
				_id: "$owner",
				played: { $sum: 1 },
				successRate: { $avg: "$won" },
			},
		},
		{ $sort: { successRate: -1 } },
		{
			$limit: 1,
		},
	]);

	res.json(avgScore);
});
router.get("/loser", auth, async (req, res) => {
	const avgScore = await Game.aggregate([
		{
			$group: {
				_id: "$owner",
				played: { $sum: 1 },
				avgAge: { $avg: "$won" },
			},
		},
		{ $sort: { avgAge: 1 } },
		{
			$limit: 1,
		},
	]);

	res.json(avgScore);
});

module.exports = router;
