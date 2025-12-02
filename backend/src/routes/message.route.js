import express from 'express';

const router=express.Router();

router.get("/message",(req,res)=>{
    res.send("hello")
})

export default router