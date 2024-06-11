const express = require('express');
const connectToMongo = require('./db.js');
const app = express()
const cors = require('cors');
const port = 8000
connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// app.use((req,res,next)=>{
// res.setHeader("Assess-Control-Allow-Origin","http://localhost:3000");
// res.header(
//   "Assess-Control-Allow-Origin",
//   "Origin, X-Requested-With , Content_Type, Accept"
// );
// next();
// })
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api',require("./routes/CreateUser"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})