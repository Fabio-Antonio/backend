const supertest = require('supertest');
const { app, server } = require('../index');
const request = supertest(app);
const User = require('../models/user');
const { disconnectDB } = require('../database/config');
const jwt = require('jsonwebtoken');

const uid = 1;
let token;

describe('API test', () => {

  beforeAll(done => {
    const usuario = new User({
      uid,
      name:'test',
      email:'test@yalovi.com',
      photoURL:'test path',
      phoneNumber: '+525500000000'
  });

  usuario.save()
   token = jwt.sign(usuario.toJSON(),process.env.JWT_SECRET,{
    expiresIn: '1h'
})

    done()

  })
 
  afterAll(done => {

    disconnectDB()
    server.close();
    done()

  })

  describe('/api/categorias', () => {

    it('example post request using a mocked database instance', async () => {

      const res = await request.post('/api/categorias').send({
        categoria:"categoria test",
        descripcion:"decripcion test"
      }).set('x-token',token);
      expect(res.status).toBe(200);
    });

    it('example request using a mocked database instance', async () => {
      const res = await request.get('/api/categorias');

      expect(res.status).toBe(200);
    });

  });
});