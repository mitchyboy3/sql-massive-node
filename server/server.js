const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');

const config = require('./config.js');
const ctl = require('./products_controller.js');

const app = module.exports = express();
const port = config.port || 3000;
const connectionString = 'postgres://araunadgmfdkrv:01c934a0c1f4a7aa58f0b2c8f6bdba061a612264c147025635fcfcb725c7e4ba@ec2-54-221-220-82.compute-1.amazonaws.com:5432/d4puiqc5cf5bro?ssl=true';
massive( connectionString ).then(dbInstance => {app.set('db', dbInstance)});


app.use(bodyParser.json());
app.use(cors());

app.get('/api/products', ctl.getAll)
app.get('/api/product/:id', ctl.getOne)
app.put('/api/product/:id', ctl.update)
app.post('/api/product', ctl.create)
app.delete('/api/product/:id', ctl.delete)



app.listen(port, console.log(`LISTENING ON PORT ${port}.`))