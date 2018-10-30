const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { jwtSecret } = require("../../config/auth");
const userService = require("../../services/users");

module.exports = new JWTstrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
  },
  async (jwtPayload, cb) => {
    const user = userService.get(jwtPayload._id, "_id " + jwtPayload.join(" "));
    if (!user) {
      return cb({
        status: 404,
        message: "No user was found"
      });
    }
    return cb(null, user);
  }
);
