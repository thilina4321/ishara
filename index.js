const express = require("express");
const mongoose = require("mongoose");
const app = express();
const admin = require('./router/super-admin')
const agent = require('./router/service-agent')
const customer = require('./router/customer')
const cors = require('cors')

const port = 3000;

app.use(express.json());
app.use(cors())

app.use('/admin', admin)
app.use('/agent', agent)
app.use('/customer', customer)

app.listen(port, () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/hasantha", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connect ", port);
    })
    .catch((error) => {
      console.log(error);
    });
});
