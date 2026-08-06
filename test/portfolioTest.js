import assert from 'node:assert'
import {test,after,before} from 'node:test'
import {connect_db} from '../config/connect_db.js'
import mongoose from "mongoose";
import { app } from '../app.js'
import supertest from "supertest";
//import {Portfolio} from "../models/portfolio.js";

before(async function (){
    await connect_db()
})

after( async function () {
    await mongoose.connection.close()
})

test('GET /api/portfolio', async function (){
    const response = await supertest (app).get('/api/portfolio')

    assert.strictEqual(response.statusCode,200)
    assert.ok(Array.isArray(response.body))
    assert.ok(response.body.length > 0)
    assert.ok(response.body[0].name)

})

let personId

test('POST /api/portfolio', async function () {

    //await Portfolio.deleteOne({ name: 'TestPortfolio' })

    const response = await supertest ( app )
        .post('/api/portfolio')
        .send({
            name:'TestPortfolio',
            category:'Frontend',
            shortDescription:'Its application for user cools',
            generalDescription:'Users cools',
            technologies:'Node JS',
            linkRepository:'https://hithub.com',
            icon:'icon.png',
            linkVideo:'https://vide.mp4'
        })
    assert.strictEqual(response.statusCode,201)
    assert.ok(response.body._id)
    assert.ok(response.body.name,'TestPortfolio')
    personId = response.body._id
})

test('PUT /api/portfolio', async function () {
    const response = await supertest ( app )
        .put(`/api/portfolio/${personId}`)
        .set({
            name:'DevLinks',
            category:'FullStack',
            shortDescription:'Its application for user cools',
            generalDescription:'Users cools',
            technologies:'Node JS',
            linkRepository:'https://hithub.com',
            icon:'icon.png',
            linkVideo:'https://vide.mp4'
        })
    assert.strictEqual(response.statusCode,200)
})

test( 'DELET /api/portfolio', async function () {
    const response = await supertest ( app )
        .delete(`/api/portfolio/${personId}`)

    assert.strictEqual(response.statusCode,200)

})