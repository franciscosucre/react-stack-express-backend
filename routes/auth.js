const express = require("express"),
  router = express.Router(),
  authService = require("../services/auth"),
  { uidField } = require('../config/auth');

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Authenticates the user.
 *     parameters:
 *      - name: uid
 *        description: Unique identification property of a user
 *        in:  body
 *        required: true
 *        schema:
 *          type: string
 *      - name: password
 *        description: User password
 *        in:  body
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       201:
 *         description: The created cat
 *         schema:
 *           type: object
 *           items:
 *               $ref: '#/definitions/Cat'
 */
router.post("/login", async function(req, res, next) {
  try {
    const response = await authService.login(req.body[uidField], req.body['password'])
    res.status(200).json(response);
    next();
  } catch (error) {
    next(error, req, res);
  }
});

module.exports = router;
