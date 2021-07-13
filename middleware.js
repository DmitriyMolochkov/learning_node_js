const {performance} = require('perf_hooks');

exports.getInfoAboutRequest = async function (ctx, next) {
    const request = ctx.request;
    console.log(`Запрос:\nВремя: ${new Date().toLocaleString()}\nЗапрос: ${request.url}\nМетод: ${request.method}\nТело: ${JSON.stringify(request.body)}`);
    await next();
    const response = ctx.response;
    console.log(`Ответ:\nКод: ${response.code}\nТело: ${JSON.stringify(response.body)}`);
}

exports.getTimeOfRequest = async function (ctx, next) {

    let time = performance.now();

    await next();
    time = performance.now() - time;
    console.log(`Время выполнения = ${time.toLocaleString()} ms\n`);

}
