const supertest = require('supertest');
const { app, server } = require('../index');
const request = supertest(app);

const { disconnectDB } = require('../database/config');

describe('API test', () => {
 

  describe('/api/categorias', () => {

    it('example post request using a mocked database instance', async () => {

      const res = await request.post('/api/categorias').send({
        categoria:"categoria test",
        descripcion:"decripcion test"
      });
      expect(res.status).toBe(200);
    });

    it('example request using a mocked database instance', async () => {
      const res = await request.get('/api/categorias');

      expect(res.status).toBe(200);
    });

  });
});