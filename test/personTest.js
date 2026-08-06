import { test, before, after } from 'node:test'  // ← add "before"
import assert from 'node:assert'
import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../app.js'
import { connect_db } from '../config/connect_db.js'  // ← add this import

before(async () => {
    await connect_db()  // ← connect MongoDB antes de los tests
})

after(async () => {
    await mongoose.connection.close() // ← close la connexion de MongoDB after de los tests
})

test('GET /api/person', async () => {
    const response = await request(app).get('/api/person')
    assert.strictEqual(response.statusCode, 200)   // Correct status
    assert.ok(Array.isArray(response.body))                // Return an array
    assert.ok(response.body.length > 0)              // Has at least a person
    assert.ok(response.body[0].name)                       // Each person has name

})
let personId

test('POST /api/person', async () => {
    const response = await request(app)
        .post('/api/person')
        .send({ name: 'TestUser', lastName: 'Guerrero', biography: 'Developer fullstack', linkImg: 'https://example.com/img.jpg'})

    assert.strictEqual(response.statusCode, 201)  // 201 = Created
    assert.ok(response.body._id)                           // MongoDB assigned un id
    assert.strictEqual(response.body.name, 'TestUser')
    personId = response.body._id

})

test('PUT /api/person/:id', async () => {
    const response = await request(app)
        .put(`/api/person/${personId}`)
        .send({ name: 'Samuel', lastName: 'Guerrero', biography: 'Developer Frontend', linkImg: 'https://example.com/img.jpg' })

    assert.strictEqual(response.statusCode, 200)
})

test('DELETE /api/person/:id', async () => {
    const response = await request(app)
        .delete(`/api/person/${personId}`)

    assert.strictEqual(response.statusCode, 200)
})