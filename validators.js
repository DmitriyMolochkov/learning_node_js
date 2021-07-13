const trava = require('trava');
const { Required, Optional, Each, Enum, Check, Keys, Some, ValidationError } = trava;

const isString = s => typeof s === 'string';
const isEmail = s => /^\S+@\S+\.\S+$/.test(s);
const isMongoDBId = s => /^[0-9a-fA-F]{24}$/.test(s);

const userIdSchema = {
    _id: Check(un => isMongoDBId(un)),
};

const userCreateSchema = {
    username: Check(un => isString(un) && /(?=^[a-zA-Z])[a-zA-Z0-9]{3,10}$/.test(un)),
    password: Check(un => isString(un) && /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/.test(un)),
    email: Check(un => isString(un) && isEmail(un))
};

const userUpdateSchema = {
    ...userIdSchema,
    ...userCreateSchema
};

const validateUserId = trava(userIdSchema);
const validateUserCreateModel = trava(userCreateSchema);
const validateUserUpdateModel = trava(userUpdateSchema);

const getUser = trava(validateUserId);
const createUser = trava(validateUserCreateModel);
const updateUser = trava(validateUserUpdateModel);
const deleteUser = trava(validateUserId);

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}

