import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import "dotenv/config"

export const signup = async (req,res)=>{
    const {fullName,email,password}=req.body;

    try {
        if(!fullName || ! email || !password){
            return res.status(400).json({message:"All fields are required!!"});
        }
        if(password.length<6){
            return res.status(400).json({mesage:"Passwords must be 8 characters!!"})
        }
        const reSimple = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!reSimple.test(email)){
            return res.status(400).json({message:"Invalid Email Format!!"});
        }

        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exist!!"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({
            fullName,
            email,
            password:hashedPassword
        })
        console.log(newUser)

        if(newUser){
            const savedUser=await newUser.save();
            generateToken(newUser._id,res);
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
                
            })
            try {
                
                await sendWelcomeEmail(savedUser.email,savedUser.fullName,ENV.clientURL)
            } catch (error) {
                console.log("failed to send welcome email",error)
            }
        }
        else{
            return res.status(400).json({message:"Invalid User Data!!"});
        }
    } catch (error) {
        console.log("erorr in sign Up controller",error);
            return res.status(500).json({message:"Something went wrong!!",error});

    }
}