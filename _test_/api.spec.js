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
    request(api).get('/books').expect(200, done);
  });

  test('it responds to delete /books with status 404', (done) => {
    request(api).delete('/books').expect(204, done);
  });

  it('responds to post /books with status 201', (done) => {
    const testData = {
      name: 'The Seasons of Life',
      author: 'Jim Rohn',
    };

    request(api)
      .post('/books')
      .send(testData)
      .expect(201)
      .expect({ ...testData, id: 4 }, done);
  });

  it('responds to an unknown book id with a 404', (done) => {
    request(api)
      .get('/books/42')
      .expect(404)
      .expect({ message: 'This book does not exist' }, done);
  });

  afterAll((done) => {
    console.log('Gracefully stopping test server');
    api.close(done);
  });
});
