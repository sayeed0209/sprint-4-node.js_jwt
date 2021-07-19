const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const gameSchema = new Schema(
	{
		dice1: { type: Number, required: true },
		dice2: { type: Number, required: true },
		won: { type: Number, required: true },
		owner: { type: Schema.Types.ObjectId, ref: "Player" },
	},
	{ timestamps: true }
);




const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
