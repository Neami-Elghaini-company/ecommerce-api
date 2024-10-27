// const express = require('express');
// const mongoose = require('mongoose');

// const PORT = process.env.PORT || 8000;
// const app = express();

// // const DB_USER = 'root';
// // const DB_PASSWORD = 'password';
// // const DB_PORT = 27017;
// // const DB_HOST = 'mongo';
// // const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// // mongoose.connect(URI).then(()=>console.log("connect to db...")).catch((err)=>console.log("failed to connect to db: ", err));
// mongoose.connect(process.env.URI).then(()=>console.log("connect to db...")).catch((err)=>console.log("failed to connect to db: ", err));



// app.listen(PORT, ()=> console.log(`app is up and running on port: ${PORT}`));

// ------------------------------------------

// require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/users')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.get('/', (req, res)=> res.send(`<h1>helloo${process.env.URI}</h1>`));
app.use('/api/users', userRoutes)

// connect to db
mongoose.connect(process.env.URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 