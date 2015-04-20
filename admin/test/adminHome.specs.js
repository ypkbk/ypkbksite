"use strict";
let app = require('../');
let co = require('co');
let db = require('../../lib/db.js');
let testHelpers = require('../../test/testHelpers.js');
let should = require('should');
let request = require('supertest').agent(app.listen());

describe('Administration site home page', function(){
	it('shows up without errors', function (done) {
		request
			.get('/')
			.expect(200)
			.end(done);
	});
	it('has a button to create new hospital', function (done) {
		request
			.get('/')
			.expect(function (res) {
				res.text.should.containEql("<button>Buat rumah sakit baru</button>")
			})
			.end(done);
	});
	it('has a button to create new clinic', function (done) {
		request
			.get('/')
			.expect(function (res) {
				res.text.should.containEql("<button>Buat klinik baru</button>")
			})
			.end(done);
	});
	it('has a button to create new news items', function (done) {
		request
			.get('/')
			.expect(function (res) {
				res.text.should.containEql("<button>Buat berita baru</button>")
			})
			.end(done);
	});
	it('has a button to create new text', function (done) {
		request
			.get('/')
			.expect(function (res) {
				res.text.should.containEql("<button>Buat text lain-lain baru</button>")
			})
			.end(done);
	});

	describe('has lists of', function () {
		beforeEach(function (done) {
			testHelpers.removeAllDocs(done);
		});
		afterEach(function (done) {
			testHelpers.removeAllDocs(done);
		});

		it('hospitals', function (done) {
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
		it('clinics');
		it('news');
		it('texts', function (done) {
			co(function *() {
				yield [
					db.textsCollection.insert({slug: "slug_1"}),
					db.textsCollection.insert({slug: "slug_2"}),
					db.textsCollection.insert({slug: "slug_3"}),
					db.textsCollection.insert({slug: "slug_4"})
				];

			request
				.get('/')
				.expect(function (res) {
					res.text.should.containEql("slug_1");
					res.text.should.containEql("slug_2");
					res.text.should.containEql("slug_3");
					res.text.should.containEql("slug_4");
				})
				.end(done);
			});
		});
	});	
});