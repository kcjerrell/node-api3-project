const express = require('express');

const middleware = require('../middleware/middleware');
const { validateUserId, validateUser, validatePost } = middleware;
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


// RETURN THE USER OBJECT
// this needs a middleware to verify user id
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

// RETURN THE NEWLY CREATED USER OBJECT
// this needs a middleware to check that the request body is valid
router.post('/', validateUser, (req, res) => {
  const user = { name: req.body.name };
  users.insert(user)
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json(dbError(err)));
});


// RETURN THE FRESHLY UPDATED USER OBJECT
// this needs a middleware to verify user id
// and another middleware to check that the request body is valid
router.put('/:id', validateUserId, validateUser, (req, res) => {
  const updUser = { name: req.body.name };
  users.update(req.params.id, updUser)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(dbError(err)));
});


// RETURN THE FRESHLY DELETED USER OBJECT
// this needs a middleware to verify user id
router.delete('/:id', validateUserId, (req, res) => {
  users.remove(req.params.id)
    .then(result => {
      if (result === 1)
        res.status(200).json(req.user);
      else
        res.status(400).json({ message: "something went wrong somewhere" });
    })
    .catch(err => res.status(500).json(dbError(err)));
});


// RETURN THE ARRAY OF USER POSTS
// this needs a middleware to verify user id
router.get('/:id/posts', validateUserId, (req, res) => {
  users.getUserPosts(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(dbError(err)));
});


// RETURN THE NEWLY CREATED USER POST
// this needs a middleware to verify user id
// and another middleware to check that the request body is valid
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const post = { text: req.body.text, user_id: req.params.id };
  posts.insert(post)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(dbError(err)));
});

// do not forget to export the router
module.exports = router;
