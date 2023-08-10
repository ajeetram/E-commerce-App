import express from 'express';
import { registerController, loginController, testController, resetPasswordController, updateProfileController, orderController, getAllOrdersController, orderStatusController} from '../controller/authController.js';
import {requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';



// route object
const router = express.Router();

// routing 
// REGISTER || METHOD POST

router.post("/register", registerController)

// LOGIN || POST
router.post("/login", loginController)

//reste password
router.post("/resetpassword",resetPasswordController);

// Test Routes
router.get('/test',requireSignIn,isAdmin, testController)

// protected auth route
 router.get('/user-auth', requireSignIn,async(req,res)=>{
    res.status(200).send({ok:true});
 })


// protected admin route auth
 router.get('/admin-auth', requireSignIn,isAdmin,async(req,res)=>{
    res.status(200).send({ok:true});
 })

 // update profile
 router.put('/profile', requireSignIn, updateProfileController);

 //orders
 router.get('/orders',requireSignIn,orderController);

 // all orders

 router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController);

 // order status update
 router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)

 export default  router;