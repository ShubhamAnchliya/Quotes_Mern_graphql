
import {ApolloServer} from "apollo-server";
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";
import typeDefs from "./schemaGql.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
// import { JWT_SECRET, MONGO_URI } from "./config.js";

import dotenv from "dotenv";

dotenv.config({path:'./config.env'})


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",() => {
    console.log("connected to mongodb")
})

mongoose.connection.on("error",(err) => {
    console.log("error connecting", err)
})

import './models/Quotes.js';
import './models/User.js';

import resolvers from "./resolver.js";

// context used as middleware
const context = ({req})=>{
    const { authorization } = req.headers;
    if(authorization) {
                const {userId} = jwt.verify(authorization,process.env.JWT_SECRET)
                // console.log("userID server",userId)
                return {userId};
            }
  }
const server = new ApolloServer({
    typeDefs,
    resolvers, 
    context: context,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });