const express = require('express');
const nano = require('nano')('http://admin:admin@localhost:5984');
const app = express();
const db = nano.use('funderdao');

//async function asyncCall() {
//  //await nano.db.destroy('alice')
//  await nano.db.create('alice')
//  const alice = nano.use('alice')
//  const response = await alice.insert({ happy: true }, 'rabbit')
//  return response
//}
//asyncCall()

//async function listallData(){
//    const response = await db.list({include_docs:true});
//    //console.log(response);
//    return response;
//}
//console.log(listallData());

//api to get all documents ***WORKING***
app.get('/api/getAll', (req, res) => {
    db.list({include_docs:true}, function(err, body) {
        if (!err) {
            res.send(body);
        }
    });
});


const object = {
    "_id":"7800",
    "name":"salah",
    "email":"salah@lab.com",
    "age":90
};
//api to create document ***WORKING***
app.post('/api/create', (req, res) => {
    db.insert(object, function(err, body) {
        if (!err) {
            res.send(body);
        }
        else{
            res.send(err);
        }
    });
});

//api to get document by id ***WORKING***
app.get('/api/getById/:id', (req, res) => {
    db.get(req.params.id, function(err, body) {
        if (!err) {
            res.send(body);
        }
    });
});



const test = {
    "_id":"7800",
    "_rev":"1-0b54093572b8a7f3a41c59814ad9a2a9",
    "name":"crak"
}

//api to update document by id ***WORKING***
app.put('/api/updateById/:id', (req, res) => {
    db.get(req.params.id, function(err, body) {
        if (!err) {
            db.insert(test, function(err, body) {
                if (!err) {
                    res.send(body);
                }
                else{
                    res.send(err);
                }
            });
        }
    });
});

//api to delete document by id ***WORKING***
app.delete('/api/deleteById/:id', (req, res) => {
    db.destroy(req.params.id, "1-bbbdf3a862d40040f15b51d583c6f650", function(err, body) {
        if (!err) {
            res.send(body);
        }
        else{
            res.send(err);
        }
    });
});
app.listen(3000, () => console.log('Example app listening on port 3000!'))