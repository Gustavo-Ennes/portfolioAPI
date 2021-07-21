require('dotenv').config();

const cors = require("cors")
const express = require('express');
const app = express().use('*', cors({
  origin: ['*'],
  credentials: true,
  exposedHeaders: ['set-cookie']
}))
const morgan = require('morgan');
const bodyParser = require('body-parser');
const portfolioProjectsRouter = require('./routes/portfolio/portfolio');
const indexRouter = require('./routes/portfolio/index')
const kratodoIndexRouter = require('./routes/kratodo/viewController')
const kratodoTodosRouter = require('./routes/kratodo/apiController')
const rateLimit = require("express-rate-limit");
const authMiddleware = require('./middleware/kratodo/auth')
const session = require("express-session")
const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser')

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

app.use(
  session({
  secret: 'keyboard cat',
  store: MongoStore.create({mongoUrl:process.env.DB_HOST}),
  saveUninitialized: false,
  resave: false,
  })
)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
//don't show the log when it is test
if(process.env.NODE_ENV !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//  apply limiter anti-DDos to all requests
app.use(limiter);

// whitelist subdomains
// app.use(whiteListSubdomain)
app.use(cookieParser());

app.use('/', indexRouter)
app.use('/portfolio/', portfolioProjectsRouter)
app.use('/kratodo/', kratodoIndexRouter)
app.use('/kratodo/todos/',authMiddleware, kratodoTodosRouter)


module.exports = app