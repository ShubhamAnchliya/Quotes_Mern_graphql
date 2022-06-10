

import { useQuery } from '@apollo/client';
import {  useParams } from 'react-router-dom';
import { GET_USER_PROFILE_ID } from '../gqloperations/queries';

import "./OtherUserProfile.css";

const OtherUserProfile = () => {

    const {userid}   = useParams();
    // console.log(userid);


  const {loading, error, data} = useQuery(GET_USER_PROFILE_ID,{
    variables:{userid},
    fetchPolicy:"cache-and-network"
  })



  if (loading) return <h3>Profile Loading...</h3>
  if (error) return `Error! ${error.message}`;
  if (data) console.log(data);



  return (
    <>
   
      <div>
        <h1 className="uprofile_heading">Profile</h1>

        <div className='container2'>

          <div className="container_uprofile ">
            <div className="cover-photo2">
              <img src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}  alt="ProfilePic"   className="profile"/>
            </div>
            <div className="profile-name2">{data.user.firstName}</div>
            <p className="about2">Email - {data.user.email}</p>
          </div> 


          <div className='items4' >


              {
                  data.user.quotes.map(quo => {
                    return(
                      <blockquote className='blockquote2'>

                          <div className='block_div2'> 
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

export default OtherUserProfile;