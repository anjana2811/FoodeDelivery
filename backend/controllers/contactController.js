const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 