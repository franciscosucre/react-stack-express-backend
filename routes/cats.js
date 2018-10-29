const express = require("express"),
  router = express.Router(),
  catsService = require("../services/cats"),
  ResourceNotFoundException = require("../exceptions/ResourceNotFound"),
  { MongoDBQueryParams } = require("unified-queryparams");

/**
 * @swagger
 * /cats/:
 *   get:
 *     tags:
 *       - Cats
 *     summary: Obtains all cats. It can be filtered using a set of parameters in the query string.
 *     parameters:
 *       - $ref: '#/parameters/limit'
 *       - $ref: '#/parameters/skip'
 *       - $ref: '#/parameters/filter'
 *       - $ref: '#/parameters/fields'
 *       - $ref: '#/parameters/sort'
 *     responses:
 *       200:
 *         description: List of cats
 *         schema:
 *           type: array
 *           items:
 *               $ref: '#/definitions/Campaign'
 */
router.get("/", async function(req, res, next) {
  try {
    const queryParams = new MongoDBQueryParams(req.query),
      query = queryParams.getQuery(),
      { limit, projection, skip, sort } = queryParams.getQueryOptions();
    const objects = await catsService.list(
      query,
      limit,
      skip,
      sort,
      projection
    );
    res.status(200).json(objects);
    next();
  } catch (error) {
    next(error, req, res);
  }
});

/**
 * @swagger
 * /cats/count:
 *   get:
 *     tags:
 *       - Cats
 *     summary: Returns the number of documents that satisfy the requested query
 *     parameters:
 *       - $ref: '#/parameters/filter'
 *     responses:
 *       200:
 *         description: Count
 *         schema:
 *           type: Number
 */
router.get("/count", async function(req, res, next) {
  try {
    const queryParams = new MongoDBQueryParams(req.query),
      query = queryParams.getQuery();
    const count = await catsService.count(query);
    res.status(200).json(count);
    next();
  } catch (error) {
    next(error, req, res);
  }
});

/**
 * @swagger
 * /cats/:
 *   post:
 *     tags:
 *       - Cats
 *     summary: Creates a cat.
 *     parameters:
 *      - name: title
 *        description: Title of the cat
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
router.post("/", async function(req, res, next) {
  try {
    const object = await catsService.create(req.body);
    res.status(201).json(object);
    next();
  } catch (error) {
    next(error, req, res);
  }
});

/**
 * @swagger
 * /cats/{id}:
 *   get:
 *     tags:
 *       - Cats
 *     summary: Obtains a single cat with the given Business unit short label and code.
 *     parameters:
 *       - name: id
 *         description: MongoDB id of the desired object
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - $ref: '#/parameters/fields'
 *     responses:
 *       200:
 *         description: Successfully searches the specified cat
 *       400:
 *         schema:
 *           - $ref: '#/responses/BadRequest'
 *       404:
 *         schema:
 *           - $ref: '#/responses/NotFound'
 *       500:
 *         schema:
 *           - $ref: '#/responses/InternalServerError'
 */
router.get("/:id", async function(req, res, next) {
  try {
    const queryParams = new MongoDBQueryParams(req.query),
      { projection } = queryParams.getQueryOptions();
    const object = await catsService.get(req.params.id, projection);
    if (!object) {
      throw new ResourceNotFoundException(`The resource was not found`);
    } else {
      res.status(200).json(object);
    }
    next();
  } catch (error) {
    next(error, req, res);
  }
});

/**
 * @swagger
 * /cats/{id}:
 *   put:
 *     tags:
 *       - Cats
 *     summary: Removes the requested document
 *     parameters:
 *       - name: id
 *         description: MongoDB id of the desired object
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - $ref: '#/parameters/fields'
 *     responses:
 *       200:
 *         description: Successfully searches the specified cat
 *       400:
 *         schema:
 *           - $ref: '#/responses/BadRequest'
 *       404:
 *         schema:
 *           - $ref: '#/responses/NotFound'
 *       500:
 *         schema:
 *           - $ref: '#/responses/InternalServerError'
 */
router.put("/:id", async function(req, res, next) {
  try {
    const object = await catsService.update(req.params.id, req.body);
    if (!object) {
      throw new ResourceNotFoundException(`The resource was not found`);
    } else {
      res.status(200).json(object);
    }
    next();
  } catch (error) {
    next(error, req, res);
  }
});

/**
 * @swagger
 * /cats/{id}:
 *   put:
 *     tags:
 *       - Cats
 *     summary: Updates partially the requested document
 *     parameters:
 *       - name: id
 *         description: MongoDB id of the desired object
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - $ref: '#/parameters/fields'
 *     responses:
 *       200:
 *         description: List of cats
 *         schema:
 *           type: array
 *           items:
 *               $ref: '#/definitions/Cat'
 *               
 *       400:
 *         schema:
 *           - $ref: '#/responses/BadRequest'
 *       404:
 *         schema:
 *           - $ref: '#/responses/NotFound'
 *       500:
 *         schema:
 *           - $ref: '#/responses/InternalServerError'
 */
router.patch("/:id", async function(req, res, next) {
  try {
    const object = await catsService.update(req.params.id, {
      $set: req.body
    });
    if (!object) {
      throw new ResourceNotFoundException(`The resource was not found`);
    } else {
      res.status(200).json(object);
    }
    next();
  } catch (error) {
    next(error, req, res);
  }
});

/**
 * @swagger
 * /cats/{id}:
 *   delete:
 *     tags:
 *       - Cats
 *     summary: Removes the requested document
 *     parameters:
 *       - name: id
 *         description: MongoDB id of the desired object
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - $ref: '#/parameters/fields'
 *     responses:
 *       200:
 *         description: Successfully searches the specified cat
 *       400:
 *         schema:
 *           - $ref: '#/responses/BadRequest'
 *       404:
 *         schema:
 *           - $ref: '#/responses/NotFound'
 *       500:
 *         schema:
 *           - $ref: '#/responses/InternalServerError'
 */
router.delete("/:id", async function(req, res, next) {
  try {
    const object = await catsService.remove(req.params.id);
    if (!object) {
      throw new ResourceNotFoundException(`The resource was not found`);
    } else {
      res.status(200).json(object);
    }
    next();
  } catch (error) {
    next(error, req, res);
  }
});

module.exports = router;
