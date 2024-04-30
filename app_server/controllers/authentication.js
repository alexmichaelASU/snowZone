const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');

async function register(req, res) {
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Email has already been used" });
        }

        // Create a new user
        const user = new User();
        user.email = req.body.email;
        user.setPassword(req.body.password);

        // Save the user to the database
        await user.save();

        // Generate a JWT for the user
        const token = user.generateJwt();
        
        // Send the token as a response
        return res
            .status(200)
            .json({ token });
    } catch (err) {
        // Handle any errors
        console.error(err);
        return res
            .status(500)
            .json(err);
    }
}

async function login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }

        if (user) {
            
            token = user.generateJwt();
            res
                .status(200)
                .json({ token });
        } else { 
            res
                .status(401)
                .json(info);
        }
    })(req, res, next);
}

function getUserr(req, res, next) {
    User.findOne({ email: req.params.email })
      .then(user => {
        if (user) {
          res
            .status(200)
            .json({ user });
        } else {
          res
            .status(404)
            .json({ message: "no user found" });
        }
      })
      .catch(error => {
        res
          .status(404)
          .json({ message: "error retrieving user", error });
      });
}

module.exports = {
    getUserr,
    register,
    login
};