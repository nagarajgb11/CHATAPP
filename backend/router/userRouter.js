const express = require('express');
const { protect } = require('../middleware/authMiddleware');


const userRouter = express.Router();

const { registerUser,authUser,allUsers} = require('../controllers/userController');

userRouter.route('/').post(registerUser).get(protect,allUsers);
userRouter.post('/login', authUser);

module.exports = userRouter;


