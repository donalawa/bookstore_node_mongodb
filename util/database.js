
//Step One Import Mongo Db
const mongodb = require('mongodb');
//Step Two Mongo Client
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://admin:icui4cu12345678@cluster0.i9tf1.mongodb.net/shop?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}).then(client => {
        _db = client.db();
        callback()
        console.log('Connected!!');
    }).catch(err => {
        console.log(err)
        throw err;
    })
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No database found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;