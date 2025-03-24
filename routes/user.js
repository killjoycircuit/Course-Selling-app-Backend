const { Router } = require("express");
const saltPass = require('salt-password');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { userModel, purchaseModel } = require("../db");
const { z } = require("zod");
const { userMiddleware } = require("../middleware/user");
const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
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
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.json({
                message: "User already Exist"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await userModel.create({
            email: email,
            password: hashPassword,//salt adding
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

userRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }
    try {
        const response = await userModel.findOne({
            email: email
        })
        if (!response) {
            return res.status(403).json({
                message: "User Does Not Exist in Our DB"
            })
        }
        const passwordMatch = await bcrypt.compare(password, response.password);
        if (passwordMatch) {
            const token = jwt.sign({
                _id: response._id.toString()
            }, JWT_SECRET
            )
            return res.json({
                token: token
            })
        }
        else {
            return res.status(403).json({
                message: "invalid credentials"
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            message: "An error occurred during login",
            error: err.message
        });

    }
})

userRouter.get("/mycourses", userMiddleware, async function (req, res) {
    const userId = req.userId;
    const data = res.data;
    const purchases = await purchaseModel.find({
        userId
    })
    res.json({
        purchases,
        data
    })
})



module.exports = {
    userRouter: userRouter
}