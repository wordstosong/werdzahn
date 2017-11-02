var chalk = require('chalk');
var exphbs  = require('express-handlebars');
var expressServer = require('express');
var openBrowser = require('./tools/openBrowser');

var isDev = process.env.NODE_ENV === 'development';
var app = expressServer();

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: './views/layouts',
    partialsDir: './views'
}));
app.set('view engine', 'handlebars');

var title = 'werdzahn';

app.get('/', function (req, res) {
    res.render('home', { title: title });
});

app.get('/movies', function (req, res) {
    res.render('movies', { title: title + ' | Movies' });
});

app.get('/tv', function (req, res) {
    res.render('tv', { title: title + ' | TV' });
});

app.get('/music', function (req, res) {
    res.render('music', { title: title + ' | Music' });
});

app.get('/games', function (req, res) {
    res.render('games', { title: title + ' | Games' });
});

app.get('/culture', function (req, res) {
    res.render('culture', { title: title + ' | Culture' });
});

app.get('/reviews', function (req, res) {
    res.render('reviews', { title: title + ' | Reviews' });
});

app.get('/about', function (req, res) {
    res.render('about', { title: title + ' | About' });
});

// blog posts

app.get('/2017/09/05/the-spider-inside-the-man', function (req, res) {
    res.render('2017/09/05/the-spider-inside-the-man', { title: title + ' | The Spider Inside The Man' });
});




app.use(expressServer.static('public'));

var defaultPort = 8081;

var port = process.env.PORT || defaultPort;
app.listen(port, function() {
    console.log(chalk.blue('server is listening on port ' + port));

    if (isDev) {
        var browserSync = require('browser-sync');
        var bsPort = port + 1;
        browserSync({
            files: ['public/**/*.{html,js,css}', 'views/**/*.handlebars'],
            online: false,
            open: false,
            port: bsPort,
            proxy: 'localhost:' + port,
            ui: false
        });
        openBrowser(bsPort);
    }
});