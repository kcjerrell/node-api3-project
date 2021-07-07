const users = require('../users/users-model')

const dbError = (err) => { return { messsage: "database error", error: err } };

/** @type {import("express").RequestHandler} */
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const ts = new Date().toLocaleString();

  console.log(`${ts}: ${method} ${url}`);
  next();
}

/** @type {import("express").RequestHandler} */
function validateUserId(req, res, next) {
  users.getById(req.params.id)
    .then(result => {
      if (result) {
        req.user = result;
        next();
      }
      else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(err => {
      res.status(500).json(dbError(err));
    })
}

/** @type {import("express").RequestHandler} */
function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

/** @type {import("express").RequestHandler} */
function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
