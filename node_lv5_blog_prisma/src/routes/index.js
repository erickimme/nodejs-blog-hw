import express from 'express';
import SignUp from './signup.js';
import Login from './login.js';
import Users from './users.js';

import Likes from './likes.js';
import Comments from './comments.js';
import Posts from './posts.js';

const router = express.Router();

router.use('/signup', SignUp);
router.use('/login', Login);
router.use('/users', Users);
router.use('/posts', Likes);
router.use('/posts', Comments);
router.use('/posts', Posts);

export default router;
