const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')

const should = chai.should()
chai.use(chaiHttp)

describe('Create or Login User', function () {
  it('res.body should have status(200)', (done) => {
    chai.request(server)
      .post('/users/login')
      .send({
        name: 'Zuhri Nurhuda',
        email: 'zuhri.nurhuda@gmail.com'
      })
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
  it('res.body should be json', (done) => {
    chai.request(server)
      .post('/users/login')
      .send({
        name: 'Zuhri Nurhuda',
        email: 'zuhri.nurhuda@gmail.com'
      })
      .end((err, res) => {
        res.should.be.json
        done()
      })
  })
  it('res.body should be an object', (done) => {
    chai.request(server)
      .post('/users/login')
      .send({
        name: 'Zuhri Nurhuda',
        email: 'zuhri.nurhuda@gmail.com'
      })
      .end((err, res) => {
        res.body.should.be.an('object')
        done()
      })
  })
  it('res.body should have property msg', (done) => {
    chai.request(server)
      .post('/users/login')
      .send({
        name: 'Zuhri Nurhuda',
        email: 'zuhri.nurhuda@gmail.com'
      })
      .end((err, res) => {
        res.body.should.have.property('msg')
        done()
      })
  })
  it('res.body should have property user', (done) => {
    chai.request(server)
      .post('/users/login')
      .send({
        name: 'Zuhri Nurhuda',
        email: 'zuhri.nurhuda@gmail.com'
      })
      .end((err, res) => {
        res.body.should.have.property('user')
        done()
      })
  })
  it('res.body.msg should be equal lama', (done) => {
    chai.request(server)
      .post('/users/login')
      .send({
        name: 'Zuhri Nurhuda',
        email: 'zuhri.nurhuda@gmail.com'
      })
      .end((err, res) => {
        res.body.msg.should.be.equal('lama')
        done()
      })
  })
  it('res.body.user.name should be equal Zuhri Nurhuda', (done) => {
    chai.request(server)
      .post('/users/login')
      .send({
        name: 'Zuhri Nurhuda',
        email: 'zuhri.nurhuda@gmail.com'
      })
      .end((err, res) => {
        res.body.user.name.should.be.equal('Zuhri Nurhuda')
        done()
      })
  })
  it('res.body.user.email should be equal zuhri.nurhuda@gmail.com', (done) => {
    chai.request(server)
      .post('/users/login')
      .send({
        name: 'Zuhri Nurhuda',
        email: 'zuhri.nurhuda@gmail.com'
      })
      .end((err, res) => {
        res.body.user.email.should.be.equal('zuhri.nurhuda@gmail.com')
        done()
      })
  })
  it('if email is empty res.body should have status(500)', (done) => {
    chai.request(server)
      .post('/users/login')
      .send({
        name: 'Zuhri Nurhuda'
      })
      .end((err, res) => {
        res.should.have.status(500)
        done()
      })
  })
})

describe('Scrapping articles', function () {
  it('res.body should have status(200)', (done) => {
    chai.request(server)
      .post('/cheerio')
      .send({
        category: 'technology'
      })
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
  it('res.body should be json', (done) => {
    chai.request(server)
      .post('/cheerio')
      .send({
        category: 'technology'
      })
      .end((err, res) => {
        res.should.be.json
        done()
      })
  })
  it('res.body should be an object', (done) => {
    chai.request(server)
      .post('/cheerio')
      .send({
        category: 'technology'
      })
      .end((err, res) => {
        res.body.should.be.an('object')
        done()
      })
  })
  it('res.body should have property messages', (done) => {
    chai.request(server)
      .post('/cheerio')
      .send({
        category: 'technology'
      })
      .end((err, res) => {
        res.body.should.have.property('messages')
        done()
      })
  })
  it('res.body should have property category', (done) => {
    chai.request(server)
      .post('/cheerio')
      .send({
        category: 'technology'
      })
      .end((err, res) => {
        res.body.should.have.property('category')
        done()
      })
  })
  it('res.body should have property data', (done) => {
    chai.request(server)
      .post('/cheerio')
      .send({
        category: 'technology'
      })
      .end((err, res) => {
        res.body.should.have.property('data')
        done()
      })
  })
  it('res.body.messages should be equal List Categories', (done) => {
    chai.request(server)
      .post('/cheerio')
      .send({
        category: 'technology'
      })
      .end((err, res) => {
        res.body.messages.should.be.equal('List Categories')
        done()
      })
  })
  it('res.body.category should be equal technology', (done) => {
    chai.request(server)
      .post('/cheerio')
      .send({
        category: 'technology'
      })
      .end((err, res) => {
        res.body.category.should.be.equal('technology')
        done()
      })
  })
  it('res.body.data should be an array', (done) => {
    chai.request(server)
      .post('/cheerio')
      .send({
        category: 'technology'
      })
      .end((err, res) => {
        res.body.data.should.be.an('array')
        done()
      })
  })
  it('if category is empty should have status(500)', (done) => {
    chai.request(server)
      .post('/cheerio')
      .send({
        category: ''
      })
      .end((err, res) => {
        res.should.have.status(500)
        done()
      })
  })
})

describe('Get reading list', function () {
  it('res.body should have status(200)', (done) => {
    chai.request(server)
      .get('/readings/list')
      .set({
        email: 'zuhri.nurhuda@gmail.com'
      })
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
  it('res.body should have property data', (done) => {
    chai.request(server)
      .get('/readings/list')
      .set({
        email: 'zuhri.nurhuda@gmail.com'
      })
      .end((err, res) => {
        res.body.should.have.property('data')
        done()
      })
  })
  it('res.body.data should be an array', (done) => {
    chai.request(server)
      .get('/readings/list')
      .set({
        email: 'zuhri.nurhuda@gmail.com'
      })
      .end((err, res) => {
        res.body.data.should.be.an('array')
        done()
      })
  })
  it('if headers is empty should have status (403)', (done) => {
    chai.request(server)
      .get('/readings/list')
      .end((err, res) => {
        res.should.have.status(403)
        done()
      })
  })
})

