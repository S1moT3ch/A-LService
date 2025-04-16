const { EventEmitter } = require('events');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { emit } = require('process');
const uri = "mongodb+srv://Simone:S4ikJ4B2oYjj6Qpt@cluster0.ungo5pt.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("ACSAHomeConnect").command({ ping: 1 });
      console.log("Db MongoDB connesso!");
      const database = client.db("ACSAHomeConnect");
      const users = database.collection("user");
      //const user = await users.findOne({"username": "Simone"}, {_id: false, username: true, password: false});
      DbConnection.db = client.db("ACSAHomeConnect");
      DbConnection.userCollection = database.collection("user");
      DbConnection.setInstance(client);
      //console.log(user);
    } finally {
    }
  }
run().catch(console.dir);

class DbConnection extends EventEmitter {
    dbconnect(){
        this.emit('dbConnection', {
            db: this.client.db('ACSAHomeConnect')
        });
        DbConnection.setInstance(mongodb);
    }
    static setInstance(mongodb) {
        DbConnection.db = mongodb.db('ACSAHomeConnect');
        DbConnection.userCollection = DbConnection.db.collection('user');
        
    }

    
}

module.exports = DbConnection;