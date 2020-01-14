const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', [

    check('name', "Name is Required").not().isEmpty(),
    check('email', 'Include a valid Email').isEmail(),
    check('password', 'Please enter a password of minimum 3 Chracters').isLength({ min: 3 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { email, name, password } = req.body
        try {

            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: "User already exists" }] });
            }

            user = new User({
                name,
                email,
                password
            })
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            // return JWT
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                }
            )


        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }

    })



module.exports = router;