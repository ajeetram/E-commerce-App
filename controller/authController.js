import { comparePassword, hashPassword }from '../helpers/authHelper.js';
import userModel from '../models/userModel.js'
import orderModel from '../models/orderModel.js';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';




//dotenv.config('.././env');
export const loginController = async(req,res)=>{
    try {
        const {email, password} = req.body;

        // check validattion
        if(!email || !password)
        {
            return res.status(404).send({
                success:false,
                message:"Invalid email or password "
            })
        }

        //check user
        const user = await userModel.findOne({email})
        if(!user)
        {
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
            })
        }
        

        const match = await comparePassword(password, user.password)
        
        if(!match)
        {
            return res.status(200).send({
                success:false,
                message:"Invalid password",
            })
        }

        // token

        const token = await JWT.sign({_id:user._id},"qmksgtr234@&fgr",{expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name:user.name,
                email:user.email,
                address:user.address,
                phone:user.phone,
                role:user.__v,
            },
            token
        });
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
    }
}


//registerController

export const registerController = async(req, res)=>{
    try {
        
        const {name, email, password, phone, address, answer} = req.body
        // validation
        if(!name)
        {
            return res.send({message:"Name is Required"})
        }
        if(!email)
        {
            return res.send({message:"Email is Required"})
        }
        if(!password)
        {
            return res.send({message:"password is Required"})
        }
        if(!phone)
        {
            return res.send({message:"Phone is Required"})
        }
        if(!address)
        {
            return res.send({message:"Adress is Required"})
        }
        if(!answer)
        {
            return res.send({message:"Answer is Required"})
        }
        
        // check User
        const existingUser = await userModel.findOne({email})
        // existing user
        if(existingUser)
        {
            return res.status(200).send({
                success:false,
                message:'Already registered, please login'
            })
        }

        // register user (if not register)
        const hashedPassword = await hashPassword(password);
        // save 
        const user = await new userModel({name, email, phone,address, password:hashedPassword, answer }).save();
        res.status(201).send({
            success:true,
            message:"user registered successfully",
            user,
        })
        
    } catch (error) {
        
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Registeration",
            error
        })
    }
};

// reset password controller

export const resetPasswordController = async(req,res)=>{
    try {
        const {email,newPassword,answer} = await req.body;
        if(!email)
        {
            res.status(400).send({
                message:"email is required"
            })
        }
        if(!answer)
        {
            res.status(400).send({
                message:"answer is required"
            })
        }

        if(!newPassword)
        {
            res.status(400).send({
                message:"New Password is required"
            })
        }

        const user = await userModel.findOne({email,answer})
        if(!user)
        {
            return res.status(400).send({
                success:false,
                message:"Wrong Email or Answer"
            });
        }

        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success:true,
            message:"Password Reset Successfully"
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"something went wrong"
        })
    }
}

// test controller
export const testController = (req,res)=>{
    res.send({
        message:"Protected Route"
    })
}

// update profile controller

export const updateProfileController = async(req,res)=>{
    try {
        const {name,email,address,phone,password} =req.body;
         const user = await userModel.findById(req.user._id);
         //password
         if(password && password.length < 6 )
         {
            return res.json({error:"password  is required and should be 6 or more character long"});
         }

         const hashedPassword = password ? await hashPassword(password):undefined;
         const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
            name:name || user.name,
            password:hashedPassword || user.password,
            phone: phone || user.phone,
            address:address || user.address
         },{new:true});

         res.status(200).send({
            success:true,
            message:"Profile Updated Successfully",
            updatedUser
         });

        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"error while updating user prodile",
            error
        })
        
    }
}

// orders

export const orderController = async(req,res)=>{
    try {
        const orders = await orderModel.find({buyer:req.user._id})
        .populate("products","-photo")
        .populate("buyer","name");
        res.json(orders);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in orders",
            error
        })
        
    }
}

// get all orders controller

export const getAllOrdersController = async(req,res)=>{
    try {
        const orders = await orderModel.find({})
        .populate("products","-photo")
        .populate("buyer","name")
        .sort({createdAt:"-1"});
        res.json(orders);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in orders",
            error
        })   
    }
}

// order status

export const orderStatusController = async(req,res)=>{
    try {
        const {orderId} = req.params;
        const {status} = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId,{status}, {new:true})
        res.json(orders);

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while updating order",
            error
        })
    }
}
