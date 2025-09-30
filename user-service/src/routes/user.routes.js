import express from 'express';
import { LoginUser, register, VerifyCode } from '../controller/user.controller.js';
import { AuthUser } from '../middleware/Auth-middlware.js';

const router = express.Router();


router.post('/user/register',register);
router.post('/user/login',LoginUser);
router.post('/user/verify-code',AuthUser,VerifyCode);

export default router;



// http://localhost:5000/api/v1/user




