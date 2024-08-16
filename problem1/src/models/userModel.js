const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  roles: {
    type: [String],
    enum: ["CREATOR", "VIEWER", "VIEW_ALL"],
    required: true,
  },
});

const userModel = model("User", userSchema);

module.exports = userModel;
