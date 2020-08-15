/* mongoose.js */

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test");

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', () => {
    console.log("Db connected");
});

const Catschema = mongoose.Schema({
    name: String,
    age : Number
});

const Cat = mongoose.model('Kitty', Catschema);

var silence = new Cat({name: 'Silence', age: 3});
silence.save();

var adam = new Cat({name: 'Adam', age: 1});
adam.save();

var ross = new Cat({name: 'Ross', age: 5});
ross.save();

const express = require('express');
const app = express();
app.get('/', (req, res) => {
    Cat.find({}, (err, kitties) => {
        if(err) return res.json(err);
        res.json(kitties);
    });
});

app.get('/remove', (req, res) => {
    Cat.remove({}, (err, kitties) => {
        if(err) return res.json(err);
        res.redirect('/');
    });
});

app.get('/Ross', (req, res) => {
    Murdock = {
        name: "Murdock",
        age: 4
    };

    Cat.update({name: "Ross"}, Murdock, (err, kitties)=> {
        if(err) return res.json(err);
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Connect 3000');
});