// HASHTAGS
exports.hashtag = hashtag;
hashtag.type = ['GET', 'POST', 'DELETE', 'PUT'];

function hashtag(params, callback){
  if(this.method == 'POST'){
    create(this.jsonBody, callback);
  }
  if(this.method == 'GET'){
    view(params, callback);
  }
  if(this.method == 'DELETE'){
    dele(params, callback);
  }
  if(this.method == 'PUT'){
    up(this.jsonBody, callback);
  }
}

function up(params, callback){
  var submittedRating      = params['rating'];
  var groupName            = params['groupName'];
  connectToDB(function (db){
    collection = db.collection('submitted_hashtags');
    collection.find({hashtag : groupName}).toArray(function(err, docs){
      nRating = 1;

      if(docs['nRating'])
        nRating = doc['nRating'];
        else
        {
          docs['nRating'] = 1;
          nRating        = 1 ;
        }
        currentRating = docs[0]['rating'];
        newRating     = (currentRating + submittedRating)/nRating;

        connectToDB(function(db){
          console.log(newRating);
          console.log(docs[0]);
          collection = db.collection('submitted_hashtags');
          collection.update({hashtag : docs[0]['hashtag']}, {$set : {rating : newRating} }, function(err) {

            if (err)
              callback('Error');
              else
                callback('ok');
                console.log('UPDATED');
                db.close();
              });
            });
      });
  });
}

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

function view(params, callback){
  connectToDB( function(db) {
    collection = db.collection('submitted_hashtags');
    searchParams = defineSearchParams(params);
    collection.find(searchParams).sort({date: -1}).toArray(function(err, docs){
      if (err)
        callback('Error');
      docs.forEach(function(doc){
        delete doc['_id'];
      });
      callback(docs);
      db.close();
    });
  });
}

function dele(params, callback){
  var groupName  = params.groupName;
  var removeData = {hashtag : groupName};
  connectToDB(function(db){
    collection = db.collection('submitted_hashtags');
    collection.remove(removeData, function(err, objects){
      if(err){
        throw err
        callback('Something went wrong');
      }
      callback('Success');
    });

  });
}

// END OF HASHTAGS

user.type = 'GET';
exports.user = user;
function user(params, callback){
  connectToDB(function(db){
    collection = db.collection('submitted_hashtags');
    userName   = params['user'];
    collection.find({user : userName}).sort({date: -1}).toArray(function(err, docs){
      callback(docs);
      db.close();
    });
  });
}

function defineSearchParams(params){
  if(params['category'] == 'new'){
     return {};
  }
  else{
    category     = params['category'];
    searchParams = {category : category};
    return searchParams;
  }
}

function connectToDB(callback){
  var MongoClient = require('mongodb').MongoClient
  , format  = require('util').format;
  collection = {};
  MongoClient.connect('mongodb://10.10.20.177:27017/HASHTAGS', function(err, db) {
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
  doc['nRating']  = 0 ;
  return doc;
}
