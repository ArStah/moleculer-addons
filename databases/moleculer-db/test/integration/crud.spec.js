"use strict";

const { ServiceBroker } = require("moleculer");
const DbService = require("../../src");

function protectReject(err) {
	expect(err).toBe(true);
}

describe.only("Test CRUD methods", () => {
	// Create broker
	let broker = new ServiceBroker({
		logger: console,
		logLevel: "error"
	});

	// Load my service
	broker.createService(DbService, {
		name: "posts",
		settings: {
			//fields: "_id title votes"
		}
	});

	beforeAll(() => {
		return broker.start();
	});

	const posts = [
		{ title: "My first post", content: "This is the content", votes: 2},
		{ title: "Second post", content: "Waiting for the next...", votes: 5},
		{ title: "My last post", content: "This is the end! Good bye!", votes: 0}
	];

	it("should create a new entity", () => {
		return broker.call("posts.create", { entity: posts[0] }).catch(protectReject).then(res => {
			posts[0]._id = res._id;

			expect(res).toEqual(posts[0]);

		});
	});

	it("should create multiple entities", () => {
		return broker.call("posts.create", { entity: [posts[1], posts[2] ] }).catch(protectReject).then(res => {
			expect(res.length).toBe(2);

			posts[1]._id = res[0]._id;
			posts[2]._id = res[1]._id;

			expect(res[0]).toEqual(posts[1]);
			expect(res[1]).toEqual(posts[2]);

		});
	});

	it("should return with count of entities", () => {
		return broker.call("posts.count").catch(protectReject).then(res => {
			expect(res).toBe(3);
		});
	});

	it("should return with the entity by ID", () => {
		return broker.call("posts.get", { id: posts[1]._id }).catch(protectReject).then(res => {
			expect(res).toEqual(posts[1]);
		});
	});

	it("should return with multiple entity by IDs", () => {
		return broker.call("posts.model", { id: [posts[2]._id, posts[0]._id] }).catch(protectReject).then(res => {
			expect(res.length).toBe(2);
			expect(res[0]).toEqual(posts[2]);
			expect(res[1]).toEqual(posts[0]);
		});
	});

	it("should update an entity", () => {
		return broker.call("posts.update", { id: posts[1]._id, update: {
			$set: {
				content: "Modify my content",
				votes: 8
			}
		} }).catch(protectReject).then(res => {
			expect(res._id).toEqual(posts[1]._id);
			expect(res.content).toEqual("Modify my content");
			expect(res.votes).toEqual(8);
			posts[1] = res;
		});
	});


	it("should find filtered entities (sort)", () => {
		return broker.call("posts.find", { sort: "-votes" }).catch(protectReject).then(res => {
			expect(res.length).toBe(3);
			expect(res[0]).toEqual(posts[1]);
			expect(res[1]).toEqual(posts[0]);
			expect(res[2]).toEqual(posts[2]);
		});
	});	

	it("should find filtered entities (limit, offset)", () => {
		return broker.call("posts.find", { sort: "votes", limit: 2, offset: 1 }).catch(protectReject).then(res => {
			expect(res.length).toBe(2);
			expect(res[0]).toEqual(posts[0]);
			expect(res[1]).toEqual(posts[1]);
		});
	});	

	it("should find filtered entities (search)", () => {
		return broker.call("posts.find", { search: "my", sort: "-votes" }).catch(protectReject).then(res => {
			expect(res.length).toBe(3);
			expect(res[0]).toEqual(posts[1]);
			expect(res[1]).toEqual(posts[0]);
			expect(res[2]).toEqual(posts[2]);
		});
	});	

	it("should find filtered entities (search)", () => {
		return broker.call("posts.find", { search: "my", searchFields: ["title"], sort: "-votes" }).catch(protectReject).then(res => {
			expect(res.length).toBe(2);
			expect(res[0]).toEqual(posts[0]);
			expect(res[1]).toEqual(posts[2]);
		});
	});	

	it("should remove entity by ID", () => {
		return broker.call("posts.remove", { id: posts[2]._id }).catch(protectReject).then(res => {
			expect(res).toBe(1);
		});
	});	

	it("should return with count of entities", () => {
		return broker.call("posts.count").catch(protectReject).then(res => {
			expect(res).toBe(2);
		});
	});	

	it("should remove all entities", () => {
		return broker.call("posts.clear").catch(protectReject).then(res => {
			expect(res).toBe(2);
		});
	});	

	it("should return with count of entities", () => {
		return broker.call("posts.count").catch(protectReject).then(res => {
			expect(res).toBe(0);
		});
	});	
});