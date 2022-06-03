

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from './config.js';

const  User = mongoose.model("User")
const  Quote = mongoose.model("Quote")

const resolvers = {
    Query: {
        users:async ()=> await User.find({}),
        user:async (_,{_id})=>await User.findOne({_id}),
        quotes:async ()=>await Quote.find({}).populate("by", "_id firstName"),
        iquote:async (_,{by})=>await Quote.find({by}),
        myprofile: async (_,args,{userId})=>{
            if(!userId) throw new Error("User must login")
            return await User.findOne({_id:userId})
        }
    },
    User: {
        quotes:async(ur)=>await Quote.find({by: ur._id})
    },
    Mutation:{
        signUpUser:async (_,{userNew})=>{
            const user = await User.findOne({email:userNew.email})
            if(user){
                throw new Error("User already exist with that email")
            }
            const hashedPassword = await bcrypt.hash(userNew.password,12)

            const newUser = new User({
                ...userNew,
                password:hashedPassword
            })
            return await newUser.save() 
        },
        signInUser:async (_,{userSignIn})=>{
            const user = await User.findOne({email:userSignIn.email})
            if(!user){
                throw new Error("User doesn't exist with that email")
            }
            const doMatch = await bcrypt.compare(userSignIn.password,user.password)
            if(!doMatch){
                throw new Error("Invalid Email or password")
            }
            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
            console.log("token",token);
            console.log("Uid",user._id);
            return {token}     
        },  
        createQuote:async (_,{name},{userId})=>{
            console.log(userId);
            if(!userId) throw new Error("User must login")
            const newQuote = new Quote({
                name,
                by:userId
            })      
            await newQuote.save()
            return "quote is save successfully"
        }  
    }
}

export default resolvers;


