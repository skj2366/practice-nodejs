const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.once('error', () => {
    console.log(err);
});

db.once('open', () => {
    console.log('./person/app.js DB connected');
});

const PersonSchema = mongoose.Schema({
    name: String,
    age: Number
});

const Person = mongoose.model('person', PersonSchema);
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', './person/views');

app.get('/', (req,res) => {
    Person.find({}, (err, people) => {
        if(err) return res.json(err);
        res.render('index', { people: people });
    });
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    Person.create(req.body, (err, people) => {
        if(err) return res.json(err);
        res.redirect('/');
    });
});

app.get('/:id', (req,res) => {
    // alert(req);
    Person.findOne({ _id: req.params.id }, (err, person) => {
        if(err) return res.json(err);
        res.render('read', { person: person });
    });
});

app.get('/delete/:id', (req, res) => {
    Person.deleteOne({ _id: req.params.id }, (err, person) => {
        if(err) return res.json(err);
        res.redirect('/');
    });
});

app.get('/update/:id', (req, res) => {
    Person.findOne({ _id: req.params.id }, (err, person) => {
        if(err) return res.json(err);
        res.render('update', { person: person });
    });
});

app.post('/update/:id', (req, res) => {
    Person.updateOne(
        { _id: req.params.id },
        { $set: { name: req.body.name, age: req.body.age } },
        (err, person) => {
            if(err) return res.json(err);
            res.redirect('/');
        });
});

app.listen(3000, () => {
    console.log("./person/app.js Connected");
});