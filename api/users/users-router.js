const express = require('express');

const middleware = require('../middleware/middleware');
const users = require('./users-model');
const posts = require('../posts/posts-model');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const dbError = (err) => { return { messsage: "database error", error: err } };

const router = express.Router();


// RETURN AN ARRAY WITH ALL THE USERS
router.get('/', (req, res) => {
  users.get()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(dbError(err)));
});

router.use('/:id', middleware.validateUserId);

router.get('/:id', (req, res) => {
  res.status(200).json(req.user);
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
