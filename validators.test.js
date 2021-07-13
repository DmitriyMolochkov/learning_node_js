const validators = require('./validators');

function checkField(validArray, notValidArray, validatorFunc, getModelFunc){
    validArray.forEach((item) => expect(validatorFunc(getModelFunc(item))).not.toBeInstanceOf(Error));
    notValidArray.forEach((item) => expect(validatorFunc(getModelFunc(item))).toBeInstanceOf(Error));
}

const validIds =  [
    "111111111111111111111111",
    "adfadfadfadfadfadfadfadf",
    "60ebd3a6b59c124c7ca7fdf9"
];
const notValidIds = [
    null,
    "",
    "123",
    "60ebd3a6b59c124c7333333",
    "qweqweqweqweqweqweqweqwe"
];
const validNames = [
    "Miki",
    "Yan",
    "Chebureck1",
    "Yog4pas"
];
const notValidNames = [
    null,
    "",
    "111",
    "1Tramp",
    "Yn",
    "nagibator999",
    "Bschetschischtschikiewitsch"
];
const validEmails = [
    "check@gman.ku",
    "bombombom@kuku.ru",
    "q@w.e",
    "1@1.1"
];
const notValidEmails = [
    null,
    "",
    "111",
    "qwerty",
    "lgbtq+.oh",
    "pelmeni@we$nyam",
    "q@w. ",
    "4 4.4"
];
const validPasswords = [
    "gravipushka!2D",
    "anigilyatornaya_pushka!3D",
    "Qwert3y&",
    "123saga444!sW"
];
const notValidPasswords = [
    null,
    "",
    "111",
    "qwerty",
    "Qwerty111",
    "qwer!3&$",
    "Qert3y&"
];


test('Check getUser validator', () => {
    checkField(validIds, notValidIds, validators.getUser, (item) => ({
        _id: item
    }))
});

test('Check createUser validator', () => {
    checkField(validNames, notValidNames, validators.createUser, (item) => ({
        username: item,
        email: validEmails[0],
        password: validPasswords[0]
    }));
    checkField(validPasswords, notValidPasswords, validators.createUser, (item) => ({
        username: validNames[0],
        email: validEmails[0],
        password: item
    }));
    checkField(validEmails, notValidEmails, validators.createUser, (item) => ({
        username: validNames[0],
        email: item,
        password: validPasswords[0]
    }));
});

test('Check updateUser validator', () => {
    checkField(validIds, notValidIds, validators.updateUser, (item) => ({
        _id: item,
        username: validNames[0],
        email: validEmails[0],
        password: validPasswords[0]
    }))
    checkField(validNames, notValidNames, validators.updateUser, (item) => ({
        _id: validIds[0],
        username: item,
        email: validEmails[0],
        password: validPasswords[0]
    }));
    checkField(validPasswords, notValidPasswords, validators.updateUser, (item) => ({
        _id: validIds[0],
        username: validNames[0],
        email: validEmails[0],
        password: item
    }));
    checkField(validEmails, notValidEmails, validators.updateUser, (item) => ({
        _id: validIds[0],
        username: validNames[0],
        email: item,
        password: validPasswords[0]
    }));
});

test('Check deleteUser validator', () => {
    checkField(validIds, notValidIds, validators.deleteUser, (item) => ({
        _id: item
    }))
});