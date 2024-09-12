const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const db = require('./database/models');
// const Sequelize = require('sequelize')
// const sequelize = new Sequelize({
//   dialect: 'mysql',
//   database: 'alpaca-db',
//   username: 'root',
//   password: '031296',
//   host: '127.0.0.1',
// })

const mainRouter = require('./routes/main');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

const apiUsersRouter = require('./routes/api/users');
const apiVideoGamesRouter = require('./routes/api/products');

const userViews = path.join(__dirname, './views/users');
const productsViews = path.join(__dirname, './views/products');

const userLogged = require('./middlewares/userLogged');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: 'Secreto',
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(userLogged);

app.set('view engine', 'ejs');
app.set('views', [userViews, productsViews]);

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.use('/api/users', apiUsersRouter);
app.use('/api/videogames', apiVideoGamesRouter);

app.listen(3000, () => {
  console.log('Successfully started');
});
