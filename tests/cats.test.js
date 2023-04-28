/* eslint-disable no-unused-expressions */
const chai = require('chai'); // assertions

const chaiHttp = require('chai-http'); // http requests

chai.use(chaiHttp); // adds the http plugin
const {
  describe, beforeEach, after, it,
} = require('mocha');

const mongoose = require('mongoose');
const server = require('../index'); // imports the server so I can send requests to it

const { catModel } = require('../db');

describe('cat tests', () => {
  let testCat;

  beforeEach(async () => {
    try {
      await catModel.deleteMany({});
      testCat = await catModel.create({
        name: 'Barry',
        length: 22,
        evil: true,
        whiskers: true,
      });
      testCat = JSON.parse(JSON.stringify(testCat));
      console.log();
    } catch (err) {
      console.error(err);
    }
  });

  it('should create a cat', (done) => {
    const newCat = {
      name: 'Tiddles',
      length: 12,
      evil: false,
      whiskers: false,
    };
    chai.request(server).post('/cats/create').send(newCat).end((err, res) => {
      chai.expect(err).to.be.null;
      chai.expect(res.status).to.equal(201);
      chai.expect(res.body).to.include(newCat);
      // eslint-disable-next-line no-underscore-dangle
      chai.expect(res.body._id).to.not.be.null;
      done(); // tells mocha the test has finished
    });
  });

  it('should get a cat', (done) => {
    // eslint-disable-next-line no-underscore-dangle
    chai.request(server).get(`/cats/get/${testCat._id}`).end((err, res) => {
      chai.expect(err).to.be.null;
      chai.expect(res.status).to.equal(200);
      chai.expect(res.body).to.include(testCat);
      done(); // tells mocha the test has finished
    });
  });

  it('should get all cats', (done) => {
    chai.request(server).get('/cats/getAll').end((err, res) => {
      chai.expect(err).to.be.null;
      chai.expect(res.status).to.equal(200);
      chai.expect(res.body).to.deep.include(testCat);
      done(); // tells mocha the test has finished
    });
  });

  it('should update a cat', (done) => {
    // eslint-disable-next-line no-underscore-dangle
    chai.request(server).patch(`/cats/update/${testCat._id}`).query({
      name: 'Harry',
    }).end((err, res) => {
      chai.expect(err).to.be.null;
      chai.expect(res.status).to.equal(200);
      testCat.name = 'Harry';
      chai.expect(res.body).to.include(testCat);
      done(); // tells mocha the test has finished
    });
  });

  it('should delete a cat', (done) => {
    // eslint-disable-next-line no-underscore-dangle
    chai.request(server).delete(`/cats/remove/${testCat._id}`).end((err, res) => {
      chai.expect(err).to.be.null;
      chai.expect(res.status).to.equal(200);
      chai.expect(res.body).to.include(testCat);
      done(); // tells mocha the test has finished
    });
  });

  after(async () => {
    await mongoose.disconnect();
    console.log('Successfully disconnected from the mongodb');
  });
});
