import express from 'express';
import { AddToPlayList, ForgotPassword, getUser, LoginUser, LogoutUser, myProfile, register, ResendCode, ResetPassword, VerifyCode } from '../controller/user.controller.js';
import { Verify_userIs_otpVerify } from '../middleware/Auth-middlware.js';
import {Verify_User_Islogged } from '../middleware/Verify-user.logged.auth.js';

const router = express.Router();


router.post('/user/register',register);
router.post('/user/login',LoginUser);
router.post('/user/verify-code',Verify_User_Islogged , VerifyCode);

// resend verify code
router.post('/user/resend-code',Verify_User_Islogged , ResendCode);



router.get('/user/get-userlist',Verify_userIs_otpVerify , getUser);
router.delete('/user/logout', LogoutUser);

router.get('/user/me',Verify_userIs_otpVerify , myProfile);



//forgot password
router.post('/user/forgot-password',ForgotPassword);
router.post('/user/reset-password/:id/:token' , ResetPassword);
router.post('/user/song/:songId' ,Verify_userIs_otpVerify, AddToPlayList);



export default router;



// http://localhost:5000/api/v1/user




