
import {gql} from "apollo-server";

const typeDefs = gql`
    type Query{
        users:[User]
        user(_id:ID!):User
        quotes:[QuoteWithName]
        iquote(by:ID!):[Quote],
        myprofile:User
        quotebyid(_id:ID!):QuoteById
    }

    type QuoteById{
        _id:String
        name: String!
    }

    type QuoteWithName{
        name: String!
        by:IdName
    }

    type IdName{
        _id: String
        firstName:String
    }

    type User{
        _id: ID!
        firstName:String!
        lastName:String!
        email:String!
        password:String!
        quotes:[Quote]
    }

    type Quote{
        _id: ID!
        name: String!
        by:ID!
    }


    type Token{
        token:String!
        user:User
    }

    type Mutation{
        signUpUser(userNew:UserInput!):User
        signInUser(userSignIn:UserSignInInput!):Token
        createQuote(name:String!):String
        updateQuote(_id: ID!,name:String!):String
        deleteQuote(_id: ID!): String

    }

    input UserInput{
        firstName:String!
        lastName:String!
        email:String!
        password:String!
    }
    input UserSignInInput{
        email:String!
        password:String!
    }

`

export default typeDefs;
