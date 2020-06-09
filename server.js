const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
// sync means that this is Sequelize taking the models and connecting them to associated database tables... if it doesn't find a table it will create it for you!
// {force: false} doesn't have to be included but if set to true, it would drop the re-create all of databases tables on startup which is great for when we need to make changes to the Sequelize models 
// think of it like DROP TABLE IF EXISTS
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
