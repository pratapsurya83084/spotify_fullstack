import express from 'express';
import { getUser, LoginUser, register, VerifyCode } from '../controller/user.controller.js';
import { Verify_userIs_otpVerify } from '../middleware/Auth-middlware.js';
import {Verify_User_Islogged } from '../middleware/Verify-user.logged.auth.js';

const router = express.Router();


router.post('/user/register',register);
router.post('/user/login',LoginUser);
router.post('/user/verify-code',Verify_User_Islogged , VerifyCode);
router.get('/user/get-userlist',Verify_userIs_otpVerify , getUser);

export default router;



// http://localhost:5000/api/v1/user




