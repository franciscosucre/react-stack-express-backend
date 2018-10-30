const userService = require('../services/users');
const { uidField, jwtSecret, jwtPayload } = require("../config/auth");
const jwt = require("jsonwebtoken");

const signToken = user => {
  const payload = jwtPayload.reduce(
    (prev, curr) => {
      prev[curr] = user[curr];
      return prev;
    },
    { _id: user._id }
  );
  return jwt.sign(payload, jwtSecret);
};

const login = async (uid, password) => {
  var query = {};
  query[uidField] = uid;
  const user = userService.get(query, '_id ' + jwtPayload.join(' '))
  if (!user) {
    throw new Error({
      status: 404,
      message: `User ${uid} was not found`
    });
  }
  const valid = await user.verifyPassword(password);
  if (!valid) {
    throw new Error({
      status: 404,
      message: `Invalid password`
    });
  }
  const token = signToken(user);
  return {
    user,
    token
  };
};

module.exports = {
  login
};
