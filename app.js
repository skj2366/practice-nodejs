// NodeJs (2) = Express

// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//     res.send("Hello World");
// });

// app.listen(3000, () => {
//     console.log("Server running at localhost:3000");
// });


// NodeJs (3) = get and post

//get 방식 , 하지만 get은 주소 노출이 되니까 ... 하핳 .. Post방식을 쓰자
// const express = require('express');
// const app = express();

// app.set('view engine', 'ejs');
// app.set('views', './views');
// app.get('/', (req,res) => {
//     res.render('index');
// });

// app.get('/get', (req, res) => {
//     res.send("GET");
// });

// app.listen(3000, () => {
//     console.log('Connected at 3000');
// });


//Post 
const express = require('express');
const app = express();
const bodyParser = require(`body-parser`);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req,res) => {
    res.render('index');
});

app.get('/get', (req, res) => {
    res.send("GET");
});

app.post('/post', (req, res) => {
    res.send('POST');
});

app.listen(3000, () => {
    console.log('Connected at 3000');
});
