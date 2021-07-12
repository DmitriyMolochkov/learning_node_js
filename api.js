const {User} = require('./storage');
const httpStatus = require('http-status');
const validators = require('./validators');
const { ValidationError } = require('./errors');
exports.helloWorld = function (ctx, next) {
    ctx.body = 'Hello World Application!';
};

exports.getUser = async function (ctx, next) {
    let _id = ctx.params.id;
    const userData = validators.getUser({_id});
    if (userData instanceof Error) return ValidationError(ctx, userData);
    let user = await User.findById(_id).exec();
    if(user == null){
        ctx.status = httpStatus.NOT_FOUND;
        return;
    }
    ctx.body = user;
};

exports.getUsers = async function (ctx, next) {
    let users = await User.find({}).exec();
    ctx.body = users;
};

exports.createUser = async function (ctx, next) {
    const userData = validators.createUser(ctx.request.body);
    if (userData instanceof Error) return ValidationError(ctx, userData);
    let user = new User(userData);
    await user.save();
    ctx.body = user;
};

exports.updateUser = async function (ctx, next) {
    let _id = ctx.params.id;
    const userData = validators.updateUser({_id, ...ctx.request.body});
    if (userData instanceof Error) return ValidationError(ctx, userData);
    let user = await User.findByIdAndUpdate(_id, userData).exec();
    if(user == null){
        ctx.status = httpStatus.NOT_FOUND;
        return;
    }
    ctx.body = await User.findById(_id).exec();
};

exports.deleteUser = async function (ctx, next) {
    let _id = ctx.params.id;
    const userData = validators.deleteUser({_id});
    if (userData instanceof Error) return ValidationError(ctx, userData);
    await User.findByIdAndDelete(_id).exec()
    ctx.status = httpStatus.NO_CONTENT;
};