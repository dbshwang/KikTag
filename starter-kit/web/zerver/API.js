exports.create = create;
function create(params, callback) {
  var doc = init_doc(params.data);

  connectToDB(function(db){
    collection = db.collection('submitted_hashtags');

   collection.insert(doc, function(err, objects) {
      if (err) callback('Error');
      else callback('ok');
      db.close();
    });

  });
}

view.type = 'GET';
exports.view = view;
function view(params, callback){
  connectToDB( function(db) {
    collection = db.collection('submitted_hashtags');
    collection.find().toArray(function(err, docs){
       docs.forEach(function(doc){
         delete doc['_id'];
       });
       callback(docs);
       db.close();
    });
  });
}

function connectToDB(callback){
  var MongoClient = require('mongodb').MongoClient
  , format  = require('util').format;
  collection = {};
  MongoClient.connect('mongodb://10.10.20.78:27017/HASHTAGS', function(err, db) {
    if(err) throw err;
    callback(db);
  });
}

function init_doc(data){
  doc = {};
  doc['hashtag']  = data['hashtag'].toLowerCase();
  doc['user']     = data['user'].toLowerCase();
  doc['category'] = data['category'].toLowerCase();
  doc['rating']   = 0;
  doc['date']     = (new Date().getTime() / 1000);
  doc['desc']     = data['desc'];
  return doc;
}
