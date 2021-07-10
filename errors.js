const trava = require('trava');
const httpStatus = require('http-status');

exports.ValidationError = function (ctx, params) {
    if (params instanceof Error) {
        params = trava.ValidationError.extractData(params);
    }
    ctx.body = {
        code: 'VALIDATION_ERROR',
        params,
    };
    ctx.status = httpStatus.BAD_REQUEST;
}