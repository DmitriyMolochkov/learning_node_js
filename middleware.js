exports.getTimeOfRequest = function* (next) {
    let request = this.request;
    console.log(`Время: ${new Date().toLocaleString()}\nЗапрос: ${request.url}\nМетод: ${request.method}`);
    yield next;
}

exports.getInfoAboutRequest = function* (next) {

    let time = performance.now();
    yield next;

    time = performance.now() - time;
    console.log(`Время выполнения = ${time.toLocaleString()} ms\n`);

}