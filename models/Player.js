const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const playerSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			default: "ANONYMOUS",
		},
		tokens: [
			{
				token: { type: String, required: true },
			},
		],
	},
	{ timestamps: true }
);
playerSchema.statics.checkExistingPlayer = async function (username, next) {
	// replaced req.body.username with username

	Player.findOne({ username: username }).exec(function (error, user) {
		if (error) {
			return next(error);
		}
		// Pass user to callback and handle whether username exist in the callback.
		next(null, user);
	});
};

playerSchema.methods.generateAuthToken = async function () {
	const player = this;
	const token = jwt.sign(
		{ _id: player._id.toString() },
		process.env.ACCESS_TOKEN_SECRET
	);

	player.tokens = player.tokens.concat({ token });
	await player.save();
	return token;
};
const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
