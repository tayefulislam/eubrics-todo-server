const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;

// middle ware

app.use(cors())
app.use(express.json())


const uri = process.env.uri;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });


async function run() {

    try {

        await client.connect()

        const behaviorsCollection = client.db("eubricsTodo").collection("behaviors");
        const taskCollection = client.db("eubricsTodo").collection("tasks");


        app.get('/behaviors', async (req, res) => {
            const result = await behaviorsCollection.find({}).toArray()
            res.send(result);
        })

        app.post('/addtask', async (req, res) => {
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            console.log(task)
            res.send(result)

        })

        // get task depend on email and behavoirid

        app.get('/mytasks', async (req, res) => {
            const query = { email: req.query.email, behaviorId: req.query.behaviorId }
            const result = await taskCollection.find(query).toArray()
            console.log(result)
            res.send(result)
        })





    }
    finally {

    }

}

run().catch(console.dir)




app.get('/', (req, res) => {
    res.send('server is runnig')
})

app.listen(port, () => {
    console.log('server is runnig at ', port)
})