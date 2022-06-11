const express = require('express');
const cors = require('cors');
require('dotenv').config();
let app = express();


app.use(cors());
app.use(express.json());




async function run() {
    try {
        await client.connect();
        let projectsCollection = client.db("portfolio").collection("projects");

        app.get('/projects', async (req, res) => {
            let query = {}
            // let data = await projectsCollection.find(query).toArray();
            let result = await projectsCollection.find(query).toArray();
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