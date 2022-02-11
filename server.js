const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const exphbs = require("express-handlebars");


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

//Express middleware for processing post and put requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Setting up the public directory to handle static requests
app.use(express.static("public"))

//Setting up handlebars
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Allowing for the creation of session objects (currently set to last for two hours)
app.use(session({
    secret: 'keyboard cat',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
      }),
  }))

app.use('/', routes);

//Syncing sequelize before setting the server to listen
sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});


