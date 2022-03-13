const supertest = require('supertest');
const { app, server } = require('../index');
const request = supertest(app);

const { disconnectDB } = require('../database/config');

describe('API test', () => {
 
  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    disconnectDB()
    server.close();
    done()

  })

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