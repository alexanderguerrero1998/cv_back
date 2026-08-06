import { test, before, after } from 'node:test'
import  assert  from 'node:assert'
import mongoose from "mongoose";
import { connect_db } from '../config/connect_db.js'
import { app } from '../app.js'
import supertest from "supertest";


before( async function (){
    await connect_db()
})
after(async function(){
    await mongoose.connection.close()
})

test('GET /api/education', async function(){
    const response  = await supertest(app).get('/api/education')
    assert.strictEqual(response.statusCode,200)
    assert.ok(Array.isArray(response.body))
    assert.ok(response.body.length > 0)
    assert.ok(response.body[0].name)
})

let personId

test('POST /api/education', async function(){
    const response = await supertest( app )
        .post('/api/education')
        .send({
            name:'TestUniversity',
            degree:'Engineer of Technology',
            duration:'2018-2023',
            educationType:'Master',
            description:'Studied this carrier in Ecuador during 4 years. I became an engineer',
            linkDownload:'https://example.com/titulo.pdf'})
    assert.strictEqual(response.statusCode,201)
    assert.ok(response.body._id)
    assert.strictEqual(response.body.name,'TestUniversity')
    personId = response.body._id
})

test('PUT /api/education',async function (){
    const response =  await supertest(app)
        .put(`/api/education/${personId}`)
        .send({
            name:'University of Azuay',
            degree:'Engineer of Veterinary',
            duration:'2018-2025',
            educationType:'Master',
            description:'Studied this carrier in Ecuador during 4 years. I became an engineer',
            linkDownload:'https://example.com/titulo.pdf'})

    assert.strictEqual(response.statusCode,200)
})

test('DELETE /api/education', async function() {
    const response  = await supertest( app )
        .delete(`/api/education/${personId}`)

    assert.strictEqual(response.statusCode,200)
})


















