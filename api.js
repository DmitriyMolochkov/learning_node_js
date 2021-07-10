const storage = new (require("./storage"))();
const User = require("./user");
const validators = require('./validators');
const { ValidationError } = require('./errors');

exports.helloWorld = function (ctx, next) {
    ctx.body = 'Hello World Application!';
};

exports.getUser = function (ctx, next) {
    let id = ctx.params.id;
    const userData = validators.getUser({id});
    if (userData instanceof Error) return ValidationError(ctx, userData);
    let user = storage.getById(id);
    if(user == null){
        ctx.status = 404;
        return;
    }
    ctx.body = user;
};

exports.getUsers = function (ctx, next) {
    let users = storage.getAll();
    ctx.body = users;
};

exports.createUser = function (ctx, next) {
    ctx.status = 200;
    const userData = validators.createUser(ctx.request.body);
    if (userData instanceof Error) return ValidationError(ctx, userData);
    let user = storage.add(new User(userData));
    ctx.body = user;
};

exports.updateUser = function (ctx, next) {
    let id = ctx.params.id;
    const userData = validators.updateUser({id, ...ctx.request.body});
    if (userData instanceof Error) return ValidationError(ctx, userData);
    let user = storage.updateById(id, userData);
    if(user == null){
        ctx.status = 404;
        return;
    }
    ctx.body = user;
};

exports.deleteUser = function (ctx, next) {
    let id = parseInt(ctx.params.id);
    storage.deleteById(id);
    ctx.status = 204;
};