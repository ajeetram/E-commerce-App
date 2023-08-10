import fs  from 'fs';
import productModel from '../models/productModel.js';
import slugify from 'slugify';
import categoryModel from '../models/categoryModel.js';
import braintree from "braintree";
import orderModel from '../models/orderModel.js';
import dotenv from "dotenv";

dotenv.config();


var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHAND_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// create product controller
 export const createProductController = async(req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        
        //validation
        switch(true)
        {
            case !name:
                return res.status(500).send({error:"Name is required"});
            case !description:
                return res.status(500).send({error:"Description is required"});
            case !price:
                return res.status(500).send({error:"Price is required"});
            case !category:
                return res.status(500).send({error:"Category is required"});
            case !quantity:
                return res.status(500).send({error:"Quantity is required"});
            case photo && photo.size>100000:
                return res.status(500).send({error:"Photo is required and it should be less than 1 MB"});
        }

        const products = new productModel({...req.fields, slug:slugify(name)})
        if(photo)
        {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType=photo.type
        }

        await products.save();
        res.status(200).send({
            success:true,
            message:"product created successfully",
            products
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error while product creating"
        })
    }
 }

 // get all product

 export const getAllProductController = async(req,res)=>{
    try {

        const product = await productModel.find({}).select("-photo").populate("category").limit(12).sort({cretedAt:-1})
        res.status(200).send({
            success:true,
            message:"got all product successfully",
            countTotal:product.length,
            product
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error while getting all product",
            error
        })
        
    }
 }

 // get single product

 export const getSingleProductController = async(req,res)=>{
    try {
        const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category");
        res.status(200).send({
            success:true,
            message:"single product getting successfully",
            product,
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error while getting single product",
            error
        })
        
    }
 }

 // photo route controller

 export const getPhotoController = async(req,res)=>{
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data)
        {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data);
        }
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error while fetching photos",
            error
        })
        
    }
 }

 // product delete controller

 export const productDeleteController = async(req,res)=>{
    try {

        await productModel.findByIdAndDelete(req.params.id).select("-photo");
        res.status(200).send({
            success:true,
            message:"product deleted successfully"
        })
        
    } catch (error) {
        res.status(500).send(({
            success:false,
            message:"error while deleting product"
        }))
        
    }
 }

 // update product controller

 export const productUpdateController = async(req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        
        //validation
        switch(true)
        {
            case !name:
                return res.status(500).send({error:"Name is required"});
            case !description:
                return res.status(500).send({error:"Description is required"});
            case !price:
                return res.status(500).send({error:"Price is required"});
            case !category:
                return res.status(500).send({error:"Category is required"});
            case !quantity:
                return res.status(500).send({error:"Quantity is required"});
            case photo && photo.size>100000:
                return res.status(500).send({error:"Photo is required and it should be less than 1 MB"});
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)}, {new:true});
        if(photo)
        {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType=photo.type
        }

        await products.save();
        res.status(200).send({
            success:true,
            message:"product updated successfully",
            products
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error while product creating",
            error
        })
    }
 }


 //filter product controller

 export const filterProductController = async(req,res)=>{
    try {
        const {checked,radio} = req.body;
        let args = {};
        if(checked.length>0) args.category=checked;
        if(radio.length) args.price = {$gte:radio[0], $lte:radio[1]};
        const products = await productModel.find(args);
        res.status(200).send({
            success:true,
            products,
        })

        
    } catch (error) {
        res.status(500).send(
            {
                success:false,
                message:"error in filter",
                error
            }
        )
    }
 }


 // product count controller
 export const productCountController = async(req,res)=>{
    try {
        let total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            total,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in product count",
            error
        })
        
    }
 }

 //product perpage controller

 export const productPerpageController = async(req,res)=>{
    try {
        const perpage = 6;
        const page = req.params.page ? req.params.page:1;
        const products = await productModel.find({})
        .select("-photo")
        .skip((page-1)*perpage)
        .limit(perpage)
        .sort({createdAt:-1});

        res.status(200).send({
            success:true,
            products
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in product per page",
            error
        })
        
    }
 }


 // search product controller
 export const searchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const resutls = await productModel
        .find({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        })
        .select("-photo");
      res.json(resutls);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };

  // similar product controller

  export const similarProductController = async(req,res)=>{
    try {
        const {pid,cid} = req.params;
        const products = await productModel.find({
         category:cid,
         _id:{$ne:pid},
        }).select("-photo").limit(3)
        .populate("category");
        res.status(200).send({
            success:true,
            products
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error in similar product",
            error
        })
    }
  }

  // get product by category

  export const productCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug});
        const products = await productModel.find({category}).populate("category");
        res.status(200).send({
            success:true,
            category,
            products,
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error while getting product by category",
            error,
        })
        
    }
  }

  // payment gateway
// token
 export const braintreeTokenController = async(req,res)=>{
    try {
          gateway.clientToken.generate({},function(err,response){
            if(err)
            {
                res.status(500).send(err);
            }
            else
            {
                res.send(response);
            }
          })
        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"error in payment gatway",
            error,
        })
    }
  }

  //payments

  export const braintreePaymentController = async(req,res)=>{
    try {
        const { nonce, cart } = req.body;
        let total = 0;
        cart.map((i) => {
          total += i.price;
        });
        let newTransaction = gateway.transaction.sale(
          {
            amount: total,
            paymentMethodNonce: nonce,
            options: {
              submitForSettlement: true,
            },
          },
          function (error, result) {
            if (result) {
              const order = new orderModel({
                products: cart,
                payment: result,
                buyer: req.user._id,
              }).save();
              res.json({ ok: true });
            } else {
              res.status(500).send(error);
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
  }