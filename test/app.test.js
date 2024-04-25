const request = require('supertest');
const app = require('../app')

describe('users', () => {

    var token = ""
    var id = ""
    var email = ""
    var CIF = "B12345678"
    var direccion = "Madrid"
    var actividad = "comercio"
    var order = "asc"
    var tokenAdmin = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFlYWYyMzI2ZDVjNTBhODczZjk1ZGQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTMzODY5MTJ9.H16rF07akhaaI6FLd1rVb2X0MkxUKnQafa-kFhqvVuA"

    it('should register a user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({"name": "Menganito","email": "user25@test.com", "password": "testeos1234", "edad": "30","ciudad": "Barcelona", "intereses": "[futbol, cine]", "ofetas": "true"})
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.user.name).toEqual('Menganito')
        expect(response.body.user.email).toEqual('user25@test.com')
    })
    it('should login the users', async () => {
        const response = await request(app)
            .post('/api/auth/login') 
            .send({"email": "user25@test.com", "password": "testeos1234"})
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.user.name).toEqual('Menganito')

        token = response.body.token
        id = response.body.user._id
        email = response.body.user.email
    });

    it('should update a user', async () => {
        const response = await request(app)
            .put('/api/users/'+email)
            .send({"ciudad": "Barcelona", "intereses": "[futbol, cine]", "ofetas": "false"})
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.ciudad).toEqual('Barcelona')
    })
    it('should calificate a webpage', async () => {
        const response = await request(app)
            .put('/api/users/resena/'+CIF)
            .send({"scoring": "4", "resenas": "my mala"})
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.CIF).toEqual('B12345678')
    })
    it('should find a webpage', async () => {
        const response = await request(app)
            .get('/api/merchant/?actividad='+actividad+'&ciudad='+direccion+'&order='+order)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
    })
    it('should delete a user', async () => {
        const response = await request(app)
            .delete('/api/users/'+email)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
    })

})

describe('merchant', () => {

    var tokenAdmin = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFlYWYyMzI2ZDVjNTBhODczZjk1ZGQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTMzODY5MTJ9.H16rF07akhaaI6FLd1rVb2X0MkxUKnQafa-kFhqvVuA"
    var token = ""
    var CIF = ""
    

    it('should register a merchant', async () => {
        const response = await request(app)
            .post('/api/merchant')
            .send({"name": "ComercioTest","CIF": "123CIF321", "direccion": "Mordor", "email": "testeo@testeo.com","phone": "919191919", "webpage": "null"})
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.name).toEqual('ComercioTest')
        expect(response.body.CIF).toEqual('123CIF321')

        token = response.body.token
        CIF = response.body.CIF
        
    })
    /*it('should login the users', async () => {
        const response = await request(app)
            .post('/api/auth/login') 
            .send({"email": "user25@test.com", "password": "testeos1234"})
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.user.name).toEqual('Menganito')

        token = response.body.token
        id = response.body.user._id
        email = response.body.user.email
    });

    it('should update a user', async () => {
        const response = await request(app)
            .put('/api/users/'+email)
            .send({"ciudad": "Barcelona", "intereses": "[futbol, cine]", "ofetas": "false"})
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.ciudad).toEqual('Barcelona')
    })
    it('should calificate a webpage', async () => {
        const response = await request(app)
            .put('/api/users/resena/'+CIF)
            .send({"scoring": "4", "resenas": "my mala"})
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.CIF).toEqual('B12345678')
    })
    it('should find a webpage', async () => {
        const response = await request(app)
            .get('/api/merchant/?actividad='+actividad+'&ciudad='+direccion+'&order='+order)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
    })
    it('should delete a user', async () => {
        const response = await request(app)
            .delete('/api/users/'+email)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
    })*/

})