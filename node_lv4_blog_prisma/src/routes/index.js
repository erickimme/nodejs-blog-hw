import express from 'express';
import Likes from './likes.js';
import Comments from './comments.js';
import Posts from './posts.js';
import Login from './login.js';
import SignUp from './signup.js';

const router = express.Router();

router.use('/signup', SignUp);
router.use('/login', Login);
router.use('/posts', Likes);
router.use('/posts', Comments);
router.use('/posts', Posts);

export default router;
