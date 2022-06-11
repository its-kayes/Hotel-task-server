const { MongoClient, ServerApiVersion } = require('mongodb');
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

        app.get('/hotels', async (req, res) => {
            let query = {}
            // let data = await projectsCollection.find(query).toArray();
            let result = await hotelCollection.find(query).toArray();
            // res.send('kaj kore');
            res.send(result);
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