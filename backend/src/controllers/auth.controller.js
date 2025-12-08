import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";
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
export const login = async (req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).json({message:"Email and Password are required!!"});
    }
    try {
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid credentials"});

        const ispasswordCorrect=await bcrypt.compare(password,user.password);
        if(!ispasswordCorrect) return res.status(400).json({message:"Invalid credentials"});

        generateToken(user._id,res)
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        })
        
    } catch (error) {
        console.log("error in login controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const logout = (_,res)=>{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logout successfull"})
}

export const updateProfile = async (req,res)=>{
    try {
    const {profilePic} =req.body;
    if(!profilePic) return res.status(400).json({message:"Profile pic is required!"});
    const userId=req.user._id;
    const uploadResponse= await cloudinary.uploader.upload(profilePic)

    const updatedUser=await User.findByIdAndUpdate(
        userId,
        {profilePic:uploadResponse.secure_url},
        {new:true}
    );
    res.status(200).json(updatedUser)
    } catch (error) {
        console.log("Error in update profile",error);
        res.status(500).json({message:"Internal server error"})
        
    }
}