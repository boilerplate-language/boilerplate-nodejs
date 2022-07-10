const sinon = require('sinon')
const rewire = require('rewire')
const path = require('path')
const express = require('express')
const request = require('supertest')
const assert = require('assert')
const users = rewire('../routes/users')

const app = express()
app.set('views', path.join(__dirname, '../', 'views'))
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, '../', 'public')))
app.use('/users', users)

describe('users test', () => {
  it('GET /users', (done) => {
    request(app)
      .get('/users')
      .expect(200, 'respond with a resource')
      .end(done)
  })

  it('Call users without exception', (done) => {
    const req = {}
    const res = {
      send: sinon.spy()
    }
    const next = sinon.spy()

    users.__get__('users')(req, res, next)

    assert.ok(res.send.calledOnce)

    done()
  })

  it('Call users with exception', (done) => {
    const req = {}
    const res = {
      send: sinon.fake.throws(new Error('test message'))
    }
    const next = sinon.spy()

    users.__get__('users')(req, res, next)

    assert.ok(next.called)

    done()
  })
})
