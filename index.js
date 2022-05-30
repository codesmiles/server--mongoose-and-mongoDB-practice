// jshint esversion:6

const mongoose = require("mongoose");
const { ConnectionPoolClosedEvent } = require("mongoose/node_modules/mongodb");

// connection url
const url = "mongodb://localhost:27017/fruitsDB";

mongoose.connect(url, { useNewUrlParser: true });

//FRUIT SCHEMA
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry no name provided"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

// FRUIT MODEL
const Fruit = mongoose.model("Fruit", fruitSchema);

// ADD FRUIT
const mango = new Fruit({
// To enable the required error given to the name key appear you will have to comment out name
 name: "Mango",
  rating: 9,
  review: "satisfying fruit"
});
// mango.save();

const cashew = new Fruit({
  name: "Cashew",
  rating: 9,
  review: "satisfying",
})
// cashew.save();

// PERSON SCHEMA
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  // relationship: [fruitSchema]
  favouriteFruit: fruitSchema,
});

// CONNECT PERSON SCHEMA TO MONGOOSE
const personModel = mongoose.model("Person", personSchema);

// ADD PERSON
const person = new personModel({
  name: "Michael",
  age: 25,
});
// person.save();
const nick = new personModel({
  name: "codesmiles",
  age: 25,
  favouriteFruit: cashew

});
// nick.save();

// // add new fruits to fruits collection in fruitsDB
// const banana = {
//   name: "Banana",
//   rating: 4,
//   review: "Good fruit",
// };
// const orange = {
//   name: "Orange",
//   rating: 3,
//   review: "fair fruit",
// };
// const grape = {
//   name: `grape`,
//   rating: 5,
//   review: "Great fruit",
// };

// INSERT MULTIPLE FRUITS
// Fruit.insertMany([banana, orange, grape], function(err) {
//     if (err) {
//         console.log(`Eror`, err);
//     } else {
//         console.log(`successfully saved to ${fruit} fruitsDB`);
//     }
// });

// FIND ALL FRUITS IN FRUITSDB
Fruit.find(function (err, fruits) {
  if (err) {
    console.log(`Error`, err);
  } else {
    // console.log(fruits);
    // mongoose.connection.close();
    

    fruits.forEach((fruit) => {
      console.log(fruit.name);
    });
  }
});

// UPDATE FRUIT
// Fruit.updateOne(
//   { _id: "6294390a7a4abe110626cbe8" },
//   { name: "Kiwi" },
//   function (err) {
//     if (err) {
//       console.log(`Error`, err);
//     } else {
//       console.log(`fruit updated`);
//       mongoose.connection.close();
//     }
//   }
// );

// DELETE ONE FRUITS IN FRUITSDB
// Fruit.deleteOne(
//   {
//     _id: "6294390a7a4abe110626cbe8",
//   },
//   function (err) {
//     if (err) {
//       console.log(`Error`, err);
//     } else {
//       console.log(`fruit deleted`);
//       mongoose.connection.close();
//     }
//   }
// );

// update person
personModel.updateOne(
  { _id: "628f81daf534785cc448a762" },
  { favouriteFruit: mango },
  function (err) {
    if (err) {
      console.log(`Error`, err);
    } else {
      console.log(`person updated`);
      mongoose.connection.close();
    }
  }
);
