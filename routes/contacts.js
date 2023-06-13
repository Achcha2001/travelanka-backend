const router = require("express").Router();
const Contact = require("../models/contact");

// Create a new contact message
router.route("/add").post((req, res) => {
  const { name, email, subject, message } = req.body;

  const newContact = new Contact({
    name,
    email,
    subject,
    message
  });

  newContact
    .save()
    .then(() => {
      res.json("Message logged successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get all contact messages
router.route("/").get((req, res) => {
  Contact.find()
    .then((contact) => {
      res.json(contact);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Update a contact message
router.route("/update/:id").put(async (req, res) => {
  const { name, email, subject, message } = req.body;
  const updateContact = {
    name,
    email,
    subject,
    message
  };

  try {
    await Contact.findByIdAndUpdate(req.params.id, updateContact);
    res.status(200).send({ status: "Message updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error updating message" });
  }
});

// Delete a contact message
router.route("/delete/:id").delete(async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).send({ status: "Message deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with deleting message", error: err.message });
  }
});

// Get a contact message by ID
router.route("/get/:id").get(async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.status(200).send({ status: "Message fetched", contact });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error", error: err.message });
  }
});

module.exports = router;
