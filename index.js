const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
let app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dkbab.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        let hotelCollection = client.db("hotels_details").collection("all_hotels");
        let reviewsCollection = client.db("hotels_details").collection("reviews");

        app.get('/hotels', async (req, res) => {
            res.send(await hotelCollection.find(query).toArray());
        });

        app.get('/hotel/:id', async(req, res)=> {
            let id = req.params.id;
            let query = {_id: ObjectId(id)};
            let data = await hotelCollection.findOne(query);
            res.send(data);
        });

        app.post('/review', async(req, res)=> {
            let data = req.body;
            let result = await reviewsCollection.insertOne(data);
            res.send(result);
        });

        app.get('/reviews',async(req, res)=> {
            res.send(await reviewsCollection.find({}).toArray()); 
        });

    }

    finally{

    }
}


run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hotel Server Running ');
});

app.listen(port, () => {
    console.log('Hotel Server Running on', port);
})