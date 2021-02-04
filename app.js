import express from 'express'

const PORT = 8080
const app = express()

app.get('/', (req, res) => {
    var myTxt = new Array(
    'New York, New York',
    'My Way', 
    'All of Me', 
    'All the Things You Are', 
    'April Played the Fiddle', 
    'As Long as I Live', 
    'A Baby Just Like You', 
    'The Best of Everything', 
    'Blue Lace', 
    'The Boys Night Out', 
    'By the Time I Get to Phoenix', 
    'The Call of the Canyon', 
    'Carolina in the Morning', 
    'The Charm of You', 
    'Come Back to Me', 
    'Dear Little Boy of Mine', 
    'Dig Down Deep', 
    'Everything Happens to Me', 
    'From Here to Eternity', 
    'I Concentrate on You');

    let randnm=Math.round(Math.random()*(myTxt.length-1));
    res.send(myTxt[randnm])
})

app.get('/birth_date', (req, res) => {
    res.send("December 12, 1915")
})

app.get('/birth_city', (req, res) => {
    res.send("Hoboken, New Jersey")
})

app.get('/wives', (req, res) => {
    res.send("Nancy Barbato, Ava Gardner, Mia Farrow, Barbara Marx")
})

app.get('/picture', (req, res) => {
    res.statusCode = 302
    res.setHeader("Location", "https://upload.wikimedia.org/wikipedia/commons/a/af/Frank_Sinatra_%2757.jpg")
    res.end()
})

app.get('/public', (req, res) => {
    res.send("Everybody can see this page")
})

app.use(function(req, res, next) {
    var auth;
    if (req.headers.authorization) {
      auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');
    }
    if (!auth || auth[0] !== 'admin' || auth[1] !== 'admin') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
        res.end('Not authorized');
    } else {
        next();
    }
});

app.get('/protected', function(req, res) {
 res.send('Welcome, authenticated client');
});

app.listen(PORT, () => {
    console.log(`Server has been started on prot ${PORT}...`)
})