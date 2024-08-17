const express = require('express');
const cors = require('cors');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const session = require('express-session');
const destinyRoutes = require('./routes/destiny');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json())
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use('bungie', new OAuth2Strategy ({
    authorizationURL: 'https://www.bungie.net/en/OAuth/Authorize',
    tokenURL: 'https://www.bungie.net/platform/app/oauth/token/',
    clientID: process.env.CLIENT_ID,
    callbackURL: process.env.CALLBACK_URL,
},
    (accessToken, refreshToken, profile, done) => {
        return done(null, { accessToken, refreshToken})
    }));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
})

app.get('/auth/bungie',
    passport.authenticate('bungie', {scope: []})
);

app.get('/auth/bungie/callback',
    passport.authenticate('bungie', {failureRedirect: '/'}),
    (res, req) => {
        //Successful authentication, redirect home with user info
        res.redirect('/success');
    }
);

app.get('/success', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            success: true,
            accessToken: req.user.accessToken,
            refreshToken: req.user.refreshToken,
        });
    } else {
        res.redirect('/');
    }
});

app.use('/api/destiny', destinyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
