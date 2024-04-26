const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users.js");
//const password = process.env.VITE_MONGOOSE_PASSWORD; 
//console.log("passsword", password)

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  `mongodb+srv://18jbaltazar:temp-password@flavor-fusion.jz3ghjp.mongodb.net/users`
);

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    UserModel.findOne({name: username})
    .then((user) => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            
            } else {
                res.json("Sorry the password is incorrect")
            }
        } else {
            res.json("No record exists")
        }
    })
}) 

// app.post('/addRestaurant', (req, res) => {
//     const { username, restaurant } = req.body;
//     UserModel.findOne({ username: username })
//       .then((user) => {
//         if (user) {
//           user.restaurants.push(restaurant);
//           user.save()
//             .then((updatedUser) => res.json(updatedUser))
//             .catch((err) => res.json(err));
//         } else {
//           res.json("User not found")
//         }
//       })
//   });

  app.post('/saveRestaurant', authenticateToken, (req, res) => {
    const { restaurantId, name, price, rating, reviewCount, address, city, state } = req.body;
    const userId = req.user.id;
  
    // Save the restaurant details along with the user's ID in the database
    // You can use your preferred database and ORM/ODM for this
    // Example using Mongoose:
    const newRestaurant = new Restaurant({
      userId,
      restaurantId,
      name,
      price,
      rating,
      reviewCount,
      address,
      city,
      state,
    });
  
    newRestaurant.save()
      .then((savedRestaurant) => res.json(savedRestaurant))
      .catch((err) => res.status(500).json(err));
  });

app.listen(3001, () => console.log("Server is running..."));
