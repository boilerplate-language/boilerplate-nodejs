const path = require('path')
const express = require('express')
const request = require('supertest')
const sinon = require('sinon')
const rewire = require('rewire')
const assert = require('assert')
const index = rewire('../routes/index')

const app = express()
app.set('views', path.join(__dirname, '../', 'views'))
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, '../', 'public')))
app.use('/', index)

describe('index test', () => {
  it('GET /', (done) => {
    request(app)
      .get('/')
      .expect(200, '<!DOCTYPE html><html><head><title>Express</title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Express</h1><p>Welcome to Express</p></body></html>')
      .end(done)
  })

  it('Call index without exception', (done) => {
    const req = {}
    const res = {
      render: sinon.spy()
    }
    const next = sinon.spy()

    index.__get__('index')(req, res, next)

    assert.ok(res.render.calledOnce)

    done()
  })

  it('Call index with exception', (done) => {
    // https://codewithhugo.com/express-request-response-mocking/
    // https://www.it-swarm-ja.tech/ja/javascript/mocha%E3%81%8A%E3%82%88%E3%81%B3nodejs%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%9F%E3%83%97%E3%83%A9%E3%82%A4%E3%83%99%E3%83%BC%E3%83%88%E9%96%A2%E6%95%B0%E3%81%AE%E5%8D%98%E4%BD%93%E3%83%86%E3%82%B9%E3%83%88/1045289963/
    const req = {}
    const res = {
      render: sinon.fake.throws(new Error('test message'))
    }
    const next = sinon.spy()

    index.__get__('index')(req, res, next)

    assert.ok(next.called)

    done()
  })
})
