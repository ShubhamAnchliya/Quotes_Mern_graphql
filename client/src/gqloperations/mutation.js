import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
       
        mutation createUser($userNew:UserInput!){
            user:signUpUser(userNew:$userNew){ 
            firstName
            }
        }
  
    `


export const LOGIN_USER = gql`
       
        mutation SignInUser($userSignIn:UserSignInInput!){
           signInUser(userSignIn:$userSignIn){ 
                    token
                    user{
                        _id
                        
                      }
                    
            }
        }
    `

   
export const CREATE_QUOTE = gql`

    mutation createQuote($name:String!) {
        quote:createQuote(name:$name)
    }

    `



   
export const UPDATE_QUOTE = gql`

    mutation updateQuote($_id: ID!, $name:String!) {
        uquote:updateQuote(_id:$_id, name:$name)
    }

    `


export const DELETE_QUOTE = gql`

    mutation deleteQuote($_id:ID!) {
        dquote: deleteQuote(_id:$_id) 
    }
    
`
   