import express from "express"
import User from "../Schemas/UserSchema.js"

const router=express.Router();

router.put('/user/:email/money',async(req,res)=>{
    const email=req.params.email;
    const {money}=req.body;

    try{
        const user= await User.findOne({email})
        if(!user){
          return res.status(404).json({email:'user not found'})  
        }

        user.Money=money;
        await user.save()
        res.json({message:"money updated succesfully",user})

    }catch(error){
        console.error('Error updating money:', error);
    res.status(500).json({ error: 'Internal server error' })

    }
})
export default router