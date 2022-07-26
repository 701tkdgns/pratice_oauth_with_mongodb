const GitHubStrategy = require("passport-github2").Strategy;
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/User")


module.exports = function(passport) {
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            githubId: profile.id,
            image:profile.photos[0].value
        }

        try {
            let user = await User.findOne({githubId: profile.id})
            if (user) {
                done(null, user)
            } else{
                user = await User.create(newUser);
                done(null, user)
            }
        } catch (error) {
            console.log(error)
        }
      }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });
    
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    });
}

