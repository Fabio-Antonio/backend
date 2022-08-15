const supertest = require('supertest');
const { app, server } = require('../index');
const request = supertest(app);
const User = require('../models/user');
const Confiuration = require('../models/configuration');
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
 usuario.save();
  token = jwt.sign(usuario.toJSON(),process.env.JWT_SECRET,{
    expiresIn: '1h'
});

const configuration = new Confiuration({
      title:"title test",
      url_image:"http://url/test.com",
      country:"MX",
})

configuration.save();

  done();

  })
 
  afterAll(done => {

    disconnectDB();
    server.close();
    done();

  });

   describe('/api/categorias', () => {
      
    it('post categorias', async () => {

      const res = await request.post('/api/categorias').send({
        categoria:"categoria test",
        descripcion:"decripcion test"
      }).set('x-token',token);
      expect(res.status).toBe(200);
    });

    it('get categorías', async () => {
      const res = await request.get('/api/categorias');

      expect(res.status).toBe(200);
    });

  });

  describe('/api/selections', () => {

    it('get selections data', async () => {
      const res = await request.get('/api/selections')
      .set('x-token',token);
  
      expect(res.status).toBe(200);
    });
  
  });


  describe('/api/configuration', () => {

    it('get configuration data', async () => {
      const res = await request.get('/api/configuration');
  
      expect(res.status).toBe(200);
    });

    it('post configuration data', async () => {

      const res = await request.post('/api/configuration').send({
        title:"title test",
        url_image:"http://url/test.com",
        country:"MX"
      }).set('x-token',token);
      expect(res.status).toBe(200);
  
  });

  it('Update configuration data', async () => {

    const res = await request.put('/api/configuration').send({
      title:"title test",
      url_image:"http://url/test.com",
      country:"MX",
      promotion:{
        name: "red", banner: "htttp//upload.com",active:false
      }
    }).set('x-token',token)
    .set('ylv-country','MX');
    expect(res.status).toBe(200);

});

});
});
