const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: String,
  price: String,
  rating: Number,
  review_count: Number,
  location_address: Number,
  city: String,
  state: String,
});

const UserSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  password: String,
  restaurants: [RestaurantSchema],
});

const UserModel = mongoose.model("users ", UserSchema);
//const RestaurantModel = mongoose.model('restaurants ', RestaurantSchema)
module.exports = UserModel;
//module.exports = RestaurantModel
