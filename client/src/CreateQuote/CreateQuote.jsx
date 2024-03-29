

import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CREATE_QUOTE } from '../gqloperations/mutation';
import { GET_ALL_QUOTES, GET_MY_PROFILE } from '../gqloperations/queries';

import NavBar from '../NavBar/NavBar';
import "./CreateQuote.css";


const CreateQuote = () => {

  const navigate  = useNavigate();

  const [quote,setQuote] = useState("");

  const [createQuote, { loading, error, data}] = useMutation(CREATE_QUOTE,{
    refetchQueries:[
      { query: GET_ALL_QUOTES },
      { query: GET_MY_PROFILE }
    ]
});


    useEffect(() => {
      if(!localStorage.getItem("token")){
        navigate("/login")
      }

    
    }, [navigate])





  if(loading) return <h1>Loading</h1>

  if(error){
      // console.log(error.message)
  }
  if(data){
      console.log('data',data)
  }


  const formSubmit = (e) => {

    e.preventDefault();
  

    createQuote({
      variables:{
          name: quote
      }
    })
    console.log(quote);

    setQuote("");
    
    navigate("/")
    window.location.reload();
  }


  


  return (
    <>

    <div className='createQuote' >

            {/* {
                error && 
                <div className='red card-panel'>{error.message}</div>
            }

            {
                data && 
                <div className="green card-panel">{data.quote}</div>
            } */}

          <h1 className="heading">Create Quotes Every Day</h1>

          <form className='formCQ' onSubmit={formSubmit} >
          <textarea  
            type= "text"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            className="box"
            name="the-textarea" 
            id="the-textarea" 
            maxLength="300" 
            placeholder="Start Typing...">          
          </textarea> 

          <div className="text-center">
            <button  type='submit' className="btnQuotes  btn-primary btn-lg">Add Quote</button>
          </div>


          </form>  
         

    </div>
    
  



    </>
  )
}


export default CreateQuote;