const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

router.post('/createuser',
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password', 'Incorrect password').isLength({ min: 5 }), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        try {
            const { name, email, location } = req.body;

            // Basic validation
            if (!name || !email || !req.body.password  || !location) {
                return res.status(400).json({ success: false, error: 'All fields are required' });
            }

            await User.create({ name, email, password:secPassword, location });

            res.status(201).json({ success: true });
        } catch (error) {
            if (error.code === 11000) {
                // Duplicate key error (email already exists)
                return res.status(400).json({ success: false, error: "Email already registered" });
            }

            console.error("Error creating user:", error);
            res.status(500).json({ success: false, error: "Server error" });
        }
    });


router.post('/loginuser',
  body('email').isEmail(),
  body('password', 'Incorrect password').isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      let userData = await User.findOne({ email: req.body.email });
      if (!userData) {
        return res.status(400).json({ success: false, error: "User not found" });
      }

      const isMatch = await bcrypt.compare(req.body.password, userData.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, error: "Invalid credentials" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

module.exports = router;
