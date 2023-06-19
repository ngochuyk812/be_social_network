const express = require('express')
const app = express()
const port = 3004
const apiRoute = require('./routes/api')
const authRoute = require('./routes/auth')
const requestIp = require('request-ip');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestIp.mw());



app.use(cors());

app.use('/api', apiRoute);
app.use('/auth', authRoute);
app.get('/', (req,res)=>{
  let ip = req.clientIp
  res.send(ip)
  

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})