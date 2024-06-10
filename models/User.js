const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    middleName: { type: String, default: "" },
    gender: { type: String, default: "" },
    birthDate: {
      day: { type: String, default: "" },
      month: { type: String, default: "" },
      year: { type: String, default: "" },
    },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
