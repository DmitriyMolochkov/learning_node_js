const koa = require('koa');
const router = require('koa-router');
const record = require('./route-map');
const bodyParser = require('koa-bodyparser');
const api = require('./api');
const middleware = require('./middleware');

const app = new koa();

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


record(APIv1, '.routers');
app.use(APIv1.allowedMethods());
const server = app.listen(3000);
module.exports = server;
