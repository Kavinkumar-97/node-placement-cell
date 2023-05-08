const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const passportLocal = require('./config/passport-local-strategy');
const setAuthenticatedUser = require('./middlewares/set-authenticated-user');
const db = require('./config/mongoose');
const app = express();
const port = 8000;

app.use(express.static('assets'));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    name: 'Placement Cell',
    secret: 'YG7b#8BJ1997Bug*NIUNhhnu8#UGGUBa9(0)kdjk',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 15, // Max - age of 15 days
    },
    store: new MongoStore({
      client: db.getClient(),
      autoRemove: 'disabled',
    }),
  })
);

// Setup Views
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(expressEjsLayouts);

// Passport config
app.use(passport.initialize());
app.use(passport.session());

app.use(setAuthenticatedUser);

// Configuring Routes
app.use('/', require('./routes'));

// Listening to the port
app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }

  console.info(`Server Listening to http://localhost:${port}/`);
});
