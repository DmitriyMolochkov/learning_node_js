const storage = new (require("./storage"))();
const User = require("./user");

exports.helloWorld = function (ctx, next) {
    ctx.status = 200;
    ctx.body = 'Hello World Application!';
};

exports.getUser = function (ctx, next) {
    let id = parseInt(ctx.params.id);
    let user = storage.getById(id);
    if(user == null){
        ctx.status = 404;
        return;
    }
    ctx.type = 'json';
    ctx.status = 200;
    ctx.body = user;
};

exports.getUsers = function (ctx, next) {
    ctx.type = 'json';
    ctx.status = 200;
    let users = storage.getAll();
    ctx.body = users;
};

exports.createUser = function (ctx, next) {
    ctx.type = 'json';
    ctx.status = 200;
    let user = storage.add(new User(ctx.request.body));
    ctx.body = user;
};

exports.updateUser = function (ctx, next) {
    let id = parseInt(ctx.params.id);
    let user = storage.updateById(id, new User(ctx.request.body));
    if(user == null){
        ctx.status = 404;
        return;
    }
    ctx.type = 'json';
    ctx.status = 200;
    ctx.body = user;
};

exports.deleteUser = function (ctx, next) {
    let id = parseInt(ctx.params.id);
    storage.deleteById(id);
    ctx.status = 200;
};