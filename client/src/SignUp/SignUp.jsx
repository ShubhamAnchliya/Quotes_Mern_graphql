
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SIGNUP_USER } from '../gqloperations/mutation';

import "./SignUp.css";

const SignUp = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""

    });

    const [signUpUser, { data, loading, error }] = useMutation(SIGNUP_USER)

    if(loading) return <h1>Loading</h1>



    const InputEvent = (event) => {

        const { name, value } = event.target;

        setFormData ((preVal) => {
            return {
                ...preVal,
                [name]: value
            };
          
        });

    };

    const formSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        signUpUser({
            variables:{
                userNew:formData
            }
        })

        navigate("/login");

    }




  return (
    <>

        <div className='signupPage'>

        
            {
                error && 
                <div className='red card-panel'>{error.message}</div>
            }

            {
                data && data.user && 
                <div className='green card-panel'>{data.user.firstName} is SignedUp. You can login now!</div>
            }

            <div className="container right-panel-active" id="container">
                <div className="form-container sign-up-container">

                    <form onSubmit={formSubmit}>

                        <h1>Create Account</h1>
                        
                        <span>or use your email for registration</span>

                        <input 
                            type="text" 
                            name='firstName'
                            placeholder="FirstName" 
                            value={formData.firstName}
                            onChange={InputEvent}
                            required
                        />

                        <input 
                            type="text" 
                            name='lastName'
                            placeholder="LastName" 
                            value={formData.lastName}
                            onChange={InputEvent}
                            required
                        />

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

                        <button type='submit'>Sign Up</button>

                    </form>

                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <Link to={'/login'}><button className="ghost" id="signIn">Sign In</button></Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SignUp;