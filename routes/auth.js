const express = require("express");
const passport = require("passport");
const router = express.Router()

// @desc    Auth with Github
// @route   GET /auth/github
router.get("/github", passport.authenticate('github', {scope: ['profile']}));


// @desc    Github auth callback
// @route   GET /auth/github/callback
router.get("/github/callback", passport.authenticate('github', {failureRedirect: '/'}),
 (req, res)=>{
    res.redirect('/dashboard');
});


// @description Logout user
// @route       /auth/logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err) {return next(err);}
        res.redirect('/');
    });
});

module.exports = router