const express = require(express);
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

app.get('/', (req, res, next) => {
    console.log(req.session);
    if(!req.session.num) {
        req.session.num = 1;
    } else {
        req.session.num = req.session.num + 1;
    }
    res.send(`Number : ${req.session.num}`);
});

app.listen(3000, () => {
    console.log('listening 3000 port');
});