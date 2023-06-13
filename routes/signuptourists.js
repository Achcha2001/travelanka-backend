const router = require("express").Router();
const bcrypt = require('bcrypt');
let tourist = require("../models/signuptourist");

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const contactnumber = req.body.contactnumber;
  const password = req.body.password;

  // Encrypt the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      res.status(500).send({ status: "Error encrypting password" });
      return;
    }

    // Creating an object from the signup model
    const newTourist = new tourist({
      name,
      email,
     contactnumber,
      password: hashedPassword, // Store the hashed password
    });

    // Save the signup data
    newTourist
      .save()
      .then(() => {
        res.json("Signup added");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error saving signup" });
      });
  });
});

// router.route("/").get((req, res) => {
//   tourist
//     .find()
//     .then((tourist) => {
//       res.json(tourist);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send({ status: "Error retrieving tourist data" });
//     });
// });

router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const { name, email,contactnumber,  password } = req.body;

  // Encrypt the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      res.status(500).send({ status: "Error encrypting password" });
      return;
    }

    const updateSignup = {
      name,
      email,
      contactnumber,
      password: hashedPassword, // Store the hashed password
    };

    tourist
      .findByIdAndUpdate(userId, updateSignup)
      .then(() => {
        res.status(200).send({ status: "User updated" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error updating data" });
      });
  });
});

router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;
  await tourist
    .findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "User deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with deleting user", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;
  const user = await tourist
    .findById(userId)
    .then((tourist) => {
      res.status(200).send({ status: "User fetched", tourist });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with getting user", error: err.message });
    });
});

module.exports = router;
