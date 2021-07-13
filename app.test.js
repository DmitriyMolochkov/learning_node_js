const server = require('./app');
const {db} = require("./storage");
const request = require("supertest");
const validators = require('./validators');

beforeAll(async () => {
    await db.disconnect();
    await db.connect("mongodb://localhost/jest_db",
        { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Jest starting!');
});

afterAll(() => {
    server.close();
    db.connection.db.dropDatabase(async () => {
        await db.connection.close()
    });
    console.log('server closed!');
});

const userGetModel = { _id: null };
const userCreateModel = {
    username: "Miki",
    email: "check@gman.ku",
    password: "gravipushka!2D"
};
const userUpdateModel = {
    username: "Boby",
    email: "bombombom@kuku.ru",
    password: "anigilyatornaya_pushka!3D"
};

describe('CRUD user tests', () => {
    test('get home route GET /', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toContain('Hello World Application!');
    });

    test('create new user POST /user', async () => {
        const response = await request(server)
            .post('/user')
            .send(userCreateModel);
        expect(response.status).toEqual(200);
        const id = response.body._id;
        expect(validators.getUser({_id: id})).not.toBeInstanceOf(Error);
        userGetModel._id = id;
        expect(response.body.username).toBe(userCreateModel.username);
        expect(response.body.email).toBe(userCreateModel.email);
        expect(response.body.password).toBe(userCreateModel.password);
    });

    test('get user GET /user', async () => {
        const response = await request(server)
            .get(`/user/${userGetModel._id}`)
            .send();
        expect(response.status).toEqual(200);
        expect(response.body._id).toBe(userGetModel._id);
        expect(response.body.username).toBe(userCreateModel.username);
        expect(response.body.email).toBe(userCreateModel.email);
        expect(response.body.password).toBe(userCreateModel.password);
    });

     test('update user PUT /user', async () => {
         const response = await request(server)
             .put(`/user/${userGetModel._id}`)
             .send(userUpdateModel);
         expect(response.status).toEqual(200);
         expect(response.body._id).toBe(userGetModel._id);
         expect(response.body.username).toBe(userUpdateModel.username);
         expect(response.body.email).toBe(userUpdateModel.email);
         expect(response.body.password).toBe(userUpdateModel.password);
   });

    test('get all users GET /users', async () => {
        const response = await request(server)
            .get(`/users`)
            .send();
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(1);
        expect(response.body[0]._id).toBe(userGetModel._id);
        expect(response.body[0].username).toBe(userUpdateModel.username);
        expect(response.body[0].email).toBe(userUpdateModel.email);
        expect(response.body[0].password).toBe(userUpdateModel.password);
    });

    test('delete user DELETE /user', async () => {
        const response = await request(server)
            .delete(`/user/${userGetModel._id}`)
            .send();
        expect(response.status).toEqual(204);
        expect(response.body).toEqual({});
    });

    test('get non-existent user GET /user', async () => {
        const response = await request(server)
            .get(`/user/${userGetModel._id}`)
            .send();
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({});
    });

    test('update non-existent user PUT /user', async () => {
        const response = await request(server)
            .put(`/user/${userGetModel._id}`)
            .send(userUpdateModel);
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({});
    });

    test('delete non-existent user DELETE /user', async () => {
        const response = await request(server)
            .delete(`/user/${userGetModel._id}`)
            .send();
        expect(response.status).toEqual(204);
        expect(response.body).toEqual({});
    });
});
