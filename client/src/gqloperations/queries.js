

import { gql } from '@apollo/client';

export const GET_ALL_QUOTES = gql`
        query getAllQuotes{
                            quotes{
                            name
                            by{
                                _id
                                firstName
                            }
                            }
                        }
        `




export const GET_MY_PROFILE = gql`
query getMyProfile($_id:ID!){
    user(_id: $_id){
      _id
      firstName
      lastName
      email
      password
      quotes{
        _id
        name
        by
      }
    }            
    }
`




export const GET_USER_PROFILE_ID = gql`
        query getUserById($userid:ID!){ 
            user(_id:$userid){
                _id
                firstName
                lastName
                email
                quotes{
                    _id
                    name
                }
            }
        }
`


export const GET_QUOTE_BY_ID = gql`
query getQuoteByID($_id:ID!){
    quotebyid(_id:$_id){   
               _id
               name         
       }
                   
}


`





