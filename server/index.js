const express = require('express')
    , bodyParser = require('body-parser')
    , controller = require('./controller')
    , massive = require('massive')
    , session = require('express-session')
const Controller = require("./controller")
var cors = require('cors')
var router = express.Router();

require('dotenv').config()

port = process.env.SERVER_PORT || 4003

const app = express();

app.use(cors());


const {CONNECTION_STRING} = process.env

app.use(bodyParser.json())

app.use( express.static( `${__dirname}/../build` ) );

app.use('/profs', router); // Mount the router as middleware at path /first

router.get('/course', Controller.getProfs)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('connected')
})

//Top level middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
  }))

//sessions
  app.post('/api/login', Controller.login)
  app.delete('/api/logout', Controller.logout)


//random endpoints
app.get('/api/students', Controller.getStudents)
app.put('/api/students/:id', Controller.updateStudents)
app.get('/api/backpack', Controller.getBackpack)
app.get('/api/degrees', Controller.getStudentsByDegree)

// app.get('/api/products', controller.getProducts)

// app.get('/api/cart', controller.getCart)
// app.post('/api/cart/:id', controller.addToCart)
// app.put('/api/cart/:id', controller.updateQuantity)
// app.delete('/api/cart/:id', controller.deleteFromCart)
// app.delete('/api/checkout', controller.checkout)

app.listen(port, () => console.log('Running on port', port))
