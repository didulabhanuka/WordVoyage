const express = require(`express`);
const router = express.Router();
const postController = require('../controllers/postController')
const checkAuth = require('../middleware/check-auth')

//routes that only accessible by registered users
router.post('/add-post', checkAuth(['user', 'admin']), postController.createPost);
router.put('/update-post/:id', checkAuth(['user', 'admin']), postController.updatePost);
router.delete('/delete-post/:id', checkAuth(['user', 'admin']), postController.deletePost);


//routes that accessible for all
router.get('/all-posts', postController.allPosts);
router.get('/view-post/:id', postController.viewPost);

module.exports = router;