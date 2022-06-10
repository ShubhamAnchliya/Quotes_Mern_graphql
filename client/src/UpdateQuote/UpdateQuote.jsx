import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CREATE_QUOTE, UPDATE_QUOTE } from '../gqloperations/mutation';
import { GET_ALL_QUOTES, GET_MY_PROFILE, GET_QUOTE_BY_ID } from '../gqloperations/queries';

import NavBar from '../NavBar/NavBar';
import "./UpdateQuote.css";


const UpdateQuote = () => {

  const {id}   = useParams();

  const navigate  = useNavigate();


  const {loading:quoteloading, error:quoteerror, data:quotedata} = useQuery(GET_QUOTE_BY_ID,{
        variables:{_id:id},
        fetchPolicy:"cache-and-network"
      },
    )

  console.log(quotedata,"qd");

  const [uquote,setUQuote] = useState("");

  const [updateQuote] = useMutation(UPDATE_QUOTE,
    {
    onCompleted(data){
      console.log('updatedata',data)
    }   
  },
  { 
    refetchQueries:[
    { query: GET_ALL_QUOTES },
    { query: GET_MY_PROFILE }
    ]
}

);


   
    useEffect(() => {
      if(!localStorage.getItem("token")){
        navigate("/login")
      }
    // console.log("uid", quotedata.quotebyid.name)
    // console.log("id", id);

  //  setUQuote("");
    // setUQuote(quotedata);
    if(quotedata?.quotebyid?.name) {
      setUQuote(quotedata?.quotebyid?.name)
    }
    
    // console.log(quotedata, "quote_data")
    }, [quotedata?.quotebyid?.name])


    if (quoteloading) return <h3>Profile Loading...</h3>
    // if (error) return `Error! ${error.message}`;
    if (quotedata) console.log(quotedata);
  


  const formSubmit = (e) => {

    e.preventDefault();
   
    updateQuote({
      variables:{
          _id:id,
          name: uquote
      }
      
    })

    console.log(id,"idu")
    console.log(uquote,"uquotee");

    setUQuote("");
    
    navigate("/")
    window.location.reload();
  }


  return (
    <>

    <div className='updateQuote' >

            {/* {
                error && 
                <div className='red card-panel'>{error.message}</div>
            }

            {
                data && 
                <div className="green card-panel">{data.quote}</div>
            } */}

          <h1 className="update_heading">Update Quotes Every Day</h1>

          <form className='update_form' onSubmit={formSubmit} >

                       
            <textarea  
              type= "text"
              // value={uquote}
              value={uquote}
              onChange={(e) => setUQuote(e.target.value )}
              className="update_box"
              maxLength="300" 
              placeholder="Start Typing...">
            </textarea> 

            <div className="text-center">
              <button  type='submit' disabled={uquote?.length === 0} className="update_btn btn btn-primary btn-lg">Update Quote</button>
              <Link to={'/'} className='cancel_btn btn btn-lg btn-danger' >Cancel </Link>
            </div>


          </form>  
         

    </div>
    

    </>
  )
}

export default UpdateQuote;