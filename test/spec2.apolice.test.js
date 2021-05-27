process.env.NODE_ENV = 'test';
const expect = require('chai').expect,
    supertest = require('supertest'),
    app = require('../app'),
    server = app.listen(),
    api = supertest(server);


describe('#Apolice', () => {
    describe('GET', () => {
        it('Check apolice route without parameter does not exists', (done) => {
            api.get('/apolice/')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(404)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(404);
                    done();
                });
        });
        // it('Check apolice route with string parameter works', (done) => {
        //     api.get('/apolice/a')
        //         .set('Accept', 'application/json; charset=utf-8')
        //         .expect(200)
        //         .end((err, res) => {
        //             if (err) throw err;
        //             expect(res.status).to.equal(200);
        //             done();
        //         });
        // });
        // it('Check apolice route with number parameter works', (done) => {
        //     api.get('/apolice/1')
        //         .set('Accept', 'application/json; charset=utf-8')
        //         .expect(200)
        //         .end((err, res) => {
        //             if (err) throw err;
        //             expect(res.status).to.equal(200);
        //             done();
        //         });
        // });
        // it('Check apolice route with alphanumeric parameter works', (done) => {
        //     api.get('/apolice/1ab123abc')
        //         .set('Accept', 'application/json; charset=utf-8')
        //         .expect(200)
        //         .end((err, res) => {
        //             if (err) throw err;
        //             expect(res.status).to.equal(200);
        //             done();
        //         });
        // });
        it('Check apolice route with not numeric parameter works', (done) => {
            api.get('/apolice/a-b-c-d')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(400)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(400);
                    done();
                });
        });
        it('Check apolice route with not numeric parameter works', (done) => {
            api.get('/apolice/a0;')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(400)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(400);
                    done();
                });
        });
        // it('Check apolice route with null parameter', (done) => {
        //     api.get('/apolice/' + null)
        //         .set('Accept', 'application/json; charset=utf-8')
        //         .expect(200)
        //         .end((err, res) => {
        //             if (err) throw err;
        //             expect(res.status).to.equal(200);
        //             done();
        //         });
        // });
        // it('Check apolice route with undefined parameter', (done) => {
        //     api.get('/apolice/' + null)
        //         .set('Accept', 'application/json; charset=utf-8')
        //         .expect(200)
        //         .end((err, res) => {
        //             if (err) throw err;
        //             expect(res.status).to.equal(200);
        //             done();
        //         });
        // });
    });
});