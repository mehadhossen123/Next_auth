'use server'

import { connect } from "@/lib/dbConndect"
import bcrypt from "bcryptjs";

export const postUser=async (user)=>{
    console.log(user)
    // check user check or  not 
    const userExist=await connect('users').findOne({email:user?.email})
    if(userExist){
        return {
            success:false,
            message:"User is already exist"
        }
    }
    const encryptPassword=await bcrypt.hash(user.password,10);
  


    // if not create a new  user 
    const newUser={
        ...user,
        createdAt:new Date().toISOString(),
        password:encryptPassword,
        role:"user"
    }
    console.log(newUser)

    // and send user  details into database 
    const result=await connect("users").insertOne(newUser);
    if(result.acknowledged){
        return {
            success:true,
            message:`user insert with ${result.insertedId.toString()}`
        }
    }
}