const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db');
const createUser = require('./Routes/CreateUser');
const cors = require('cors');

mongoDB();
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept');
    next();
}
)
// Middleware
app.use(cors());
app.use(express.json());

// API route
app.use('/api', require('./Routes/CreateUser'));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
