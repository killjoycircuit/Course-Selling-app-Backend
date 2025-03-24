const{Router}=require("express");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const jwt=require("jsonwebtoken");
const saltPass = require('salt-password');
const{JWT_Admin_SECRET}=require("../config")
const {adminMiddleware}=require("../middleware/admin")
const adminRouter=Router();
const {adminModel, courseModel}=require("../db");
adminRouter.post("/signup",async function(req,res){
    const { email, password, firstName, lastName } = req.body;
    const requireBody = z.object({
        email: z.string().email(),
        password: z.string().min(3).max(15),
        firstName: z.string().min(3).max(15),
        lastName: z.string().min(3).max(15)
    })
    const parseDataWithSuccess = requireBody.safeParse(req.body);
    if (!parseDataWithSuccess.success) {
        res.json({
            message: "invalid Data",
            error: parseDataWithSuccess.error
        })
        return;
    }
    try {
        const existingUser = await adminModel.findOne({ email: email });
        if (existingUser) {
            return res.json({
                message: "User already Exist"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await adminModel.create({
            email: email,
            password: hashPassword,
            firstName: firstName,
            lastName: lastName
        })
        res.json({
            message: "You are signed Up"
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error occurred during signup"
        })
    }
})


adminRouter.post("/signin",async function(req,res){
    const{email,password}=req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }
    try{
    const response=await adminModel.findOne({
        email:email
    })
    if(!response){
        return res.status(403).json({
            message:"admin Does Not Exist in Our DB"
        })
    }
    const passwordMatch= await bcrypt.compare(password,response.password);
    if(passwordMatch){
        const token=jwt.sign({
            id:response._id.toString()},JWT_Admin_SECRET
        )
        return res.json({
            token:token
        })  
    }
    else{
        return res.status(403).json({
            message:"invalid credentials"
        })
    }
}
catch(err){
    return res.status(500).json({
        message: "An error occurred during login",
        error: err.message
    });

}
})
adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;
    if (!title || !description || !imageUrl || price == null) {
        return res.status(400).json({
             message: "All fields are required."
             });
    }

    if (typeof price !== 'number' || price < 0) {
        return res.status(400).json({ 
            message: "Price must be a non-negative number." 
        });
    }

    try {
        const course = await courseModel.create({
            title,
            description,
            imageUrl,
            price,
            creatorId: adminId
        });

        res.status(201).json({
            message: "Course created successfully.",
            courseId: course._id
        });
    } catch (error) {
        
        res.status(500).json({
             message:"An error occurred while creating the course.",
             error: error.message
             });
    }
});

adminRouter.put("/course",adminMiddleware,async function(req,res){
    const adminId=req.userId;
    const{title,description,imageUrl,price,courseId}=req.body;
    if (!title || !description || !imageUrl || price == null || !courseId) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }
    const course=await courseModel.updateOne({
        _id:courseId,
        creatorId:adminId
    },{
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        creatorId:adminId
    })
    res.json({
        message:"Course Updated",
        courseId:course._id
    })

    
})
adminRouter.get("/course/bulk",adminMiddleware,async function(req,res){
    const adminId=req.userId;

    const courses=await courseModel.find({
        creatorId:adminId
    });
    if (courses.length === 0) {
        return res.status(404).json({
            message: "No courses found for this admin."
        });
    }
    res.json({
        message:"Your Courses",
        courses
    }) 
   
})
module.exports={
    adminRouter:adminRouter
}

