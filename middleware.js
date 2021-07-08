exports.getInfoAboutRequest = function* (next) {
    let request = this.request;
    console.log(`Запрос:\nВремя: ${new Date().toLocaleString()}\nЗапрос: ${request.url}\nМетод: ${request.method}\n Тело: ${JSON.stringify(request.body)}`);
    yield next;
    let response = this.response;
    console.log(`Ответ:\nКод: ${response.code}\nТело: ${JSON.stringify(response.body)}`);
}

exports.getTimeOfRequest = function* (next) {

    let time = performance.now();
    yield next;

    time = performance.now() - time;
    console.log(`Время выполнения = ${time.toLocaleString()} ms\n`);

}