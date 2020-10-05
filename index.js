const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://anwarhossen:anwarhossen2391@cluster0.ckhne.mongodb.net/volunteerNetwork?retryWrites=true&w=majority";

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
client.connect(err => {
  const collection = client.db("volunteerNetwork").collection("register");
  console.log('database connected');

  app.post("/registered", (req, res) => {
    const Event = req.body;
    console.log(Event)
    collection.insertOne(Event)
      .then(result => {
        res.send(result.insertedCount);
               
      })
  })
  app.get('/lodeUser', (req, res) => {
    collection.find({})
    .toArray((err, documents) => {
      res.send(documents); 
    })
  })
});



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT|| port )


