

import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GET_MY_PROFILE } from '../gqloperations/queries';

import "./Profile.css";

const Profile = () => {

  const navigate  = useNavigate();

  const {loading, error, data} = useQuery(GET_MY_PROFILE,{
    fetchPolicy:"cache-and-network"
  })

  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/login")
    }
   
  }, [navigate])

  if (loading) return <h3>Profile Loading...</h3>
  if (error) return `Error! ${error.message}`;
  if (data) console.log(data);



  return (
    <>
   
      <div>
        <h1 className="profile_heading">Profile</h1>

        <div className='container1'>

          <div className="container_profile ">
            <div className="cover-photo">
              <img src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}  alt="ProfilePic"   className="profile"/>
            </div>
            <div className="profile-name">{data.user.firstName}</div>
            <p className="about">Email - {data.user.email}</p>
          </div> 


          <div className='items2' >


              {
                  data.user.quotes.map(quo => {
                    return(
                      <blockquote>

                          <div className='block_div'> 
                            {quo.name}
                          </div>


                      </blockquote>

                    )
                  })
              }
        

          </div>


        </div>
    

      </div>

    </>
  )
}

export default Profile;