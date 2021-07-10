const trava = require('trava');
const { Required, Optional, Each, Enum, Check, Keys, Some, ValidationError } = trava;

const isString = s => typeof s === 'string';
const isEmail = s => /^\S+@\S+\.\S+$/.test(s);
const isMongoDBId = s => /^[0-9a-fA-F]{24}$/.test(s);

const userIdSchema = {
    id: Check(un => isString(un) && isMongoDBId(un)),
};

const userCreateSchema = {
    username: Check(un => isString(un) && /(?=^[a-zA-Z])[a-zA-Z0-9]{3,10}/.test(un), 'CUSTOM ERROR: INVALID USERNAME!'),
    password: Check(un => isString(un) && /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/.test(un), 'CUSTOM ERROR: INVALID PASSWORD!'),
    email: Check(un => isString(un) && isEmail(un), 'CUSTOM ERROR: INVALID EMAIL!')
};

const userUpdateSchema = {
    ...userIdSchema,
    ...userCreateSchema
};

const validateUserId = trava(userIdSchema);
const validateUserCreateModel = trava(userCreateSchema);
const validateUserUpdateModel = trava(userUpdateSchema);

const getUser = trava(validateUserId)
const createUser = trava(validateUserCreateModel);
const updateUser = trava(validateUserUpdateModel);

module.exports = {
    getUser,
    createUser,
    updateUser
}

