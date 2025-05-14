const passport = require ('passport');
const LocalStrategy = require('passport-local').Strategy;
const { MongoClient, ServerApiVersion } = require('mongodb');
const { emit } = require('process');
const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const filePath = path.join(__dirname, '../json/temp.json');
const uri = "mongodb+srv://Simone:S4ikJ4B2oYjj6Qpt@cluster0.ungo5pt.mongodb.net/?appName=Cluster0";
var userdb = 0;
var userinput = 0;
var userpassword = 0;
var utenteTrovato = false;


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
    } finally {
    }
  }
run().catch(console.dir);


passport.use(
    'local-login',
    new LocalStrategy((username, password, done) => {
        userinput = username;
        userpassword = password;
        search().catch(console.dir);
        async function search() {
          try {
            const database = client.db("ACSAHomeConnect");
            userdb = database.collection("user");
            const userc = await userdb.findOne({"username": userinput, "password": userpassword}, { projection: { username: 1, cognome: 1, ruolo: 1 } });
            if(userc){
              utenteTrovato = true;
              console.log('dbFind '+utenteTrovato);
              console.log(userc);
              return done(null, userc);
            }
            if(utenteTrovato){
              utenteTrovato = false;
              const payload = { id: userc._id.toString(), username: userc.username };
              const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
              const user = { id: 1, username: 'Simone'};
              fs.writeFileSync(filePath, JSON.stringify({ username }), 'utf8');
              return done(null, { token });
            }
            return done(null, false);
          } 
          finally {
          }
        }
    })
);

passport.serializeUser((user, done) => {
  // Serializza solo l'id o un campo identificativo
  done(null, user.id || user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const database = client.db("ACSAHomeConnect");
    const userdb = database.collection("user");

    const user = await userdb.findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (err) {
    done(err);
  }
});


module.exports = passport;