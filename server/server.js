require('./config/config');

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//configuracion global de rutas
app.use( require ('./routes/index'));

// parse application/json
app.use(bodyParser.json());

  mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, ( err, resp ) => {

  if( err ) throw err;

  console.log(' Base de datos online ');
});

app.listen(process.env.PORT, () => {
 console.log('Escuchando en puerto: ', process.env.PORT);
});