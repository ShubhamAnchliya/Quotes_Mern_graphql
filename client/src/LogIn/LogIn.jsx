


import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LOGIN_USER } from '../gqloperations/mutation';
import { GET_ALL_QUOTES, GET_MY_PROFILE } from '../gqloperations/queries';
import "./LogIn.css";




const LogIn = () => {




  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email:"",
    password:""
  })


  const [signInUser, { error , loading, data }] = useMutation(LOGIN_USER,{
    onCompleted(data){
      console.log('data',data?.signInUser?.user?._id);
      localStorage.setItem("token",data?.signInUser?.token)
      localStorage.setItem("id",data?.signInUser?.user?._id)
      navigate(`/`)

    }
  },
  {
    refetchQueries:[
      { query: GET_ALL_QUOTES },
      { query: GET_MY_PROFILE }
    ]
  },
  {fetchPolicy:"cache-and-network"}
    );

  console.log(data,"data1");

  if(loading) return <h1>Loading</h1>

  if(data) {

    console.log("data",data);
  
  }



  const InputEvent = (event) => {

    const { name, value } = event.target;

    setFormData((preVal) => {

      return {
        ...preVal,
        [name]: value,
      };

    });

  };



  const formSubmit = (e) => {

    e.preventDefault();
    console.log(formData);


 
    signInUser({
      variables:{
        userSignIn:formData
      }
    })


  


   

  }



  return (
    <>


        <div className='logInPage'>


        {
            error && 
            <div className='red card-panel'>{error.message}</div>
        }





          <div className="container" id="container">
            <div className="form-container sign-in-container">
              <form className='formL'  onSubmit={formSubmit} >
                <h1>Sign in</h1>
                
                <span>or use your account</span>
                <input 
                  type="email" 
                  name='email'
                  placeholder="Email" 
                  value={formData.email}
                  onChange={InputEvent}
                  required

                />
                <input 
                  type="password" 
                  name='password'
                  placeholder="Password" 
                  value={formData.password}
                  onChange={InputEvent}
                  required
                />
  

                <button className='buttonL' type='submit'>Sign In</button>

              </form>
            </div>

            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <Link to={'/signup'} ><button className="buttonL ghost" id="signUp">Sign Up</button></Link>
                </div>
              </div>
            </div>
            
          </div>

           
                  
        </div>
    </>
  )
}

export default LogIn;