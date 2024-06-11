const express = require('express');
const connectToMongo = require('./db.js');
const app = express()
const cors = require('cors');
const port = 8000
connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api',require("./routes/CreateUser"));
app.use('/api',require("./routes/DisplayData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})