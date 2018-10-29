const { Cat } = require("../models/cats");

/**
 * Returns the cats that satisfy a query
 *
 * @param {Object} query: MongoDB query.
 * @param {Number} limit: Used for pagination. Defines how many documents can fit in the result set.
 * @param {Number} skip: Used for pagination. Defines how many documents of the result query must be skipped before returing the objects.
 * @param {Object} sort: MongoDB sort options.
 * @param {Object} projection: Used for projection. Defines which fields of the objects must be returned. Useful for optimizing queries.
 */
const list = async (query, limit, skip, sort, projection) => {
  return await Cat.find(query, projection, {
    skip,
    sort,
    limit
  });
};

/**
 * Returns the count of documents that satisfy a query
 *
 * @param {Object} query: MongoDB query.
 */
const count = async query => {
  return await Cat.countDocuments(query);
};

/**
 *
 * @param {Object} document: JSON document to be stored in MongoDB
 */
const create = async document => {
  const cat = new Cat(document);
  await cat.save();
  return cat;
};

/**
 *
 * @param {String} _id: The MongoDB Id for the requested Cat
 * @param {Object} projection: Used for projection. Defines which fields of the objects must be returned. Useful for optimizing queries.
 */
const get = async (_id, projection) => {
  return await Cat.findById(_id, projection);
};

/**
 *
 * @param {String} _id: The MongoDB Id for the requested Cat
 * @param {Object} update: MongoDB update query
 */
const update = async (_id, update) => {
  return await Cat.findByIdAndUpdate(_id, update);
};

/**
 *
 * @param {String} _id: The MongoDB Id for the requested Cat
 * @param {Object} projection: Used for projection. Defines which fields of the objects must be returned. Useful for optimizing queries.
 */
const remove = async (_id, projection) => {
  return await Cat.findByIdAndDelete(_id, {
    select: projection
  });
};

module.exports = {
  list,
  count,
  get,
  create,
  update,
  remove
};
