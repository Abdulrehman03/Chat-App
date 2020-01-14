const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");

const bcrypt = require('bcryptjs');

const User = require('../../models/User');
const { check, validationResult } = require("express-validator");
const auth = require('../../middelware/auth')


//@route        GET api/auth
//@desc         Test Route
//@access       Public

router.get('/', auth, async (req, res) => { 

    try {
        const user = await User.findById(req.user.id).select('-password')
        res.send(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});


router.post('/', [
    check('email', 'Include a valid Email').isEmail(),
    check('password', 'Password Required').exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { email, password } = req.body
        try {

            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

            }


            //Return JSONwebToken

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