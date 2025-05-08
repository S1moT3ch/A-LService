const passport = require ('passport');
const LocalStrategy = require('passport-local').Strategy;
const { MongoClient, ServerApiVersion } = require('mongodb');
const { emit } = require('process');
const fs = require('fs');
const path = require('path');
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
            const userc = await userdb.findOne({"username": userinput, "password": userpassword}, {_id: false, username: true, password: true});
            if(userc){
              utenteTrovato = true;
              console.log('dbFind '+utenteTrovato);
              console.log(userc);
            }
            if(utenteTrovato){
              utenteTrovato = false;
              const user = { id: 1, username: 'Simone'};
              fs.writeFileSync(filePath, JSON.stringify({ username }), 'utf8');
              return done(null, user);
            }
            return done(null, false);
          } 
          finally {
          }
        }
    })
);

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Recupero untente in db
    const user = getUserById(id); // pseudocodice
    done(null, user);
});


module.exports = passport;