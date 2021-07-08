var koa = require('koa');
var router = require('koa-router');
var record = require('./route-map');
var bodyParser = require('koa-bodyparser');
var api = require('./api');
var middleware = require('./middleware');

var app = new koa();

const APIv1 = new router();
APIv1.get('/', api.helloWorld);
APIv1.get('/user/:id', api.getUser);
APIv1.get('/users', api.getUsers);
APIv1.post('/user', api.createUser);
APIv1.put('/user/:id', api.updateUser);
APIv1.delete('/user/:id', api.deleteUser);

app.use(bodyParser());
app.use(middleware.getTimeOfRequest);
app.use(middleware.getInfoAboutRequest);

app.use(APIv1.routes());
record(APIv1, '.routers')
app.listen(3000);
