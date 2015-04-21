"use strict";

let supertest = require('supertest');
let co = require('co');
let should = require('should');

let app = require('../');
let db = require('../../lib/db.js');
let config = require('../../config')();
let testHelpers = require('../../test/testHelpers.js');

let request = supertest.agent(app.listen());

describe('The main site', function () {

	beforeEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs(done);
	});

    it('renders without errors', function (done) {
        request
            .get('/')
            .expect(200)
            .end(done);
    });

    it('output hospitals from database', function  (done) {
    	co(function *() {
    		yield [
    			db.hospitalsCollection.insert({name: "RS 1"}),
    			db.hospitalsCollection.insert({name: "RS 2"}),
    			db.hospitalsCollection.insert({name: "RS 3"}),
    			db.hospitalsCollection.insert({name: "RS 4"})
    		];

    		request
	            .get('/')
	            .expect(function (res) {
	            	res.text.should.containEql("RS 1");
	            	res.text.should.containEql("RS 2");
	            	res.text.should.containEql("RS 3");
	            	res.text.should.containEql("RS 4");
	            })
	            .end(done);
	    });
    });

    it('output clinics from database', function  (done) {
        co(function *() {
            yield [
                db.clinicsCollection.insert({name: "Klinik 1"}),
                db.clinicsCollection.insert({name: "Klinik 2"}),
                db.clinicsCollection.insert({name: "Klinik 3"}),
                db.clinicsCollection.insert({name: "Klinik 4"})
            ];

            request
                .get('/')
                .expect(function (res) {
                    res.text.should.containEql("Klinik 1");
                    res.text.should.containEql("Klinik 2");
                    res.text.should.containEql("Klinik 3");
                    res.text.should.containEql("Klinik 4");
                })
                .end(done);
        });
    });

    it('output texts from database', function  (done) {
        co(function *() {
            yield [
                db.textsCollection.insert({slug: "ypkbk_name", text: "Yayasan"})
            ];

            request
                .get('/')
                .expect(function (res) {
                    res.text.should.containEql("Yayasan");
                })
                .end(done);
        });
    });


    describe('Articles are special. They: ', function  () {
        let today = new Date();
        let tomorrow = new Date();
        let yesterday = new Date();

        beforeEach(function (done) {
            today.setHours(0,0,0,0);
            tomorrow.setDate(today.getDate()+1);
            yesterday.setDate(today.getDate()- 1);
            tomorrow.setHours(0,0,0,0);
            yesterday.setHours(0,0,0,0);
            done();
        });

        it('output articles from database', function  (done) {
            co(function *() {
                yield [
                    db.articlesCollection.insert({title: "Article 1", publishStart : today, publishEnd : tomorrow }),
                    db.articlesCollection.insert({title: "Article 2", publishStart : today, publishEnd : tomorrow }),
                    db.articlesCollection.insert({title: "Article 3", publishStart : today, publishEnd : tomorrow }),
                    db.articlesCollection.insert({title: "Article 4", publishStart : today, publishEnd : tomorrow })
                ];

                request
                    .get('/')
                    .expect(function (res) {
                        res.text.should.containEql("Article 1");
                        res.text.should.containEql("Article 2");
                        res.text.should.containEql("Article 3");
                        res.text.should.containEql("Article 4");
                    })
                    .end(done);
            });
        });

        it('only show up when they are published', function  (done) {
            co(function *() {
                yield [
                    db.articlesCollection.insert({title: "should show - published today", publishStart : today, publishEnd : tomorrow }),
                    db.articlesCollection.insert({title: "should not be shown - enddate passed", publishStart : yesterday, publishEnd : yesterday}),
                    db.articlesCollection.insert({title: "should not be shown - started not yet occurred", publishStart : tomorrow, publishEnd : tomorrow})
                ];

                request
                    .get('/')
                    .expect(function (res) {
                        res.text.should.containEql("should show - published today");
                        res.text.should.not.containEql("should not be shown - enddate passed");
                        res.text.should.not.containEql("should not be shown - started not yet occurred");
                    })
                    .end(done);
            });
        });

        it('articles are NOT shown if start date is after today', function  (done) {
            co(function *() {
                yield db.articlesCollection.insert({title: "should not be shown - started not yet occurred", publishStart : tomorrow, publishEnd : tomorrow});

                request
                    .get('/')
                    .expect(function (res) {
                        res.text.should.not.containEql("should not be shown - started not yet occurred");
                    })
                    .end(done);
            });
        });

        it('articles are NOT shown if end date is before today', function  (done) {
            co(function *() {
                yield db.articlesCollection.insert({title: "should not be shown - enddate passed", publishStart : yesterday, publishEnd : yesterday});

                request
                    .get('/')
                    .expect(function (res) {
                        res.text.should.not.containEql("should not be shown - enddate passed");
                    })
                    .end(done);
            });
        });

        it('articles are shown only if start date is before today and end date is after today', function  (done) {
            co(function *() {
                yield db.articlesCollection.insert({title: "should show - published today", publishStart : today, publishEnd : tomorrow });

                request
                    .get('/')
                    .expect(function (res) {
                        res.text.should.containEql("should show - published today");
                    })
                    .end(done);
            });
        });

        
        it('have a default image if no image is supplied');
        it('uses the start of the content as intro if no intro is supplied');
    });
});