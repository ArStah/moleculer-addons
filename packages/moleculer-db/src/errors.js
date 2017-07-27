/*
 * moleculer-db
 * Copyright (c) 2017 Ice Services (https://github.com/ice-services/moleculer-addons)
 * MIT Licensed
 */

"use strict";

const { MoleculerError } = require("moleculer").Errors;

//const ERR_ENTITY_NOT_FOUND = "ERR_ENTITY_NOT_FOUND";

/**
 * Entity not found
 * 
 * @class EntityNotFoundError
 * @extends {Error}
 */
class EntityNotFoundError extends MoleculerError {

	/**
	 * Creates an instance of EntityNotFoundError.
	 * 
	 * @param {any} ID of entity
	 * 
	 * @memberOf EntityNotFoundError
	 */
	constructor(id) {
		super("Entity not found", 404, null, {
			id
		});
	}
}


module.exports = {
	EntityNotFoundError,

	//ERR_ENTITY_NOT_FOUND,
};