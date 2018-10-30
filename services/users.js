const { User } = require("../models/users");

/**
 * Returns the users that satisfy a query
 *
 * @param {Object} query: MongoDB query.
 * @param {Number} limit: Used for pagination. Defines how many documents can fit in the result set.
 * @param {Number} skip: Used for pagination. Defines how many documents of the result query must be skipped before returing the objects.
 * @param {Object} sort: MongoDB sort options.
 * @param {Object} projection: Used for projection. Defines which fields of the objects must be returned. Useful for optimizing queries.
 */
const list = async (query, limit, skip, sort, projection) => {
  return await User.find(query, projection, {
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
  return await User.countDocuments(query);
};

/**
 *
 * @param {Object} document: JSON document to be stored in MongoDB
 */
const create = async document => {
  const user = new User(document);
  await user.save();
  return user;
};

/**
 *
 * @param {String} _id: The MongoDB Id for the requested User
 * @param {Object} projection: Used for projection. Defines which fields of the objects must be returned. Useful for optimizing queries.
 */
const getById = async (_id, projection) => {
  return await User.findById(_id, projection);
};

/**
 *
 * @param {Object} query: The MongoDB query object
 * @param {Object} projection: Used for projection. Defines which fields of the objects must be returned. Useful for optimizing queries.
 */
const get = async (query, projection) => {
  return await User.findOne(query, projection);
};

/**
 *
 * @param {String} _id: The MongoDB Id for the requested User
 * @param {Object} update: MongoDB update query
 */
const update = async (_id, update) => {
  return await User.findByIdAndUpdate(_id, update);
};

/**
 *
 * @param {String} _id: The MongoDB Id for the requested User
 * @param {Object} projection: Used for projection. Defines which fields of the objects must be returned. Useful for optimizing queries.
 */
const remove = async (_id, projection) => {
  return await User.findByIdAndDelete(_id, {
    select: projection
  });
};

module.exports = {
  list,
  count,
  get,
  getById,
  create,
  update,
  remove
};
