const app = require('../app.js');
const request = require('supertest');

describe('api server', () => {
  let api;
  beforeAll(() => {
    api = app.listen(5000, () => {
      console.log('Test server running on port 5000');
    });
  });

  test('it responds to get / with status 200', (done) => {
    request(api).get('/').expect(200, done);
  });

  test('it responds to get / with status 200', (done) => {
    request(api).get('/cats').expect(200, done);
  });

  test('it responds to delete /cats with status 404', (done) => {
    request(api).delete('/cats').expect(204, done);
  });

  it('responds to post /cats with status 201', (done) => {
    const testData = {
      name: 'Felix',
      age: 12345,
    };

    request(api)
      .post('/cats')
      .send(testData)
      .expect(201)
      .expect({ ...testData, adopted: false, id: 4 }, done);
  });

  it('responds to an unknown cat id with a 404', (done) => {
    request(api)
      .get('/cats/42')
      .expect(404)
      .expect({ message: 'This cat does not exist' }, done);
  });

  afterAll((done) => {
    console.log('Gracefully stopping test server');
    api.close(done);
  });
});
