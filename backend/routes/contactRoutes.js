import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

/* POST Contact */
router.post("/", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* GET Contacts */
router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

/* DELETE Contact (Bonus) */
router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact deleted" });
});

export default router;
