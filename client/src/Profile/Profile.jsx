
import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GET_ALL_QUOTES, GET_MY_PROFILE } from '../gqloperations/queries';

import "./Profile.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { DELETE_QUOTE } from '../gqloperations/mutation';

const Profile = () => {

  const navigate  = useNavigate();


  const {loading, error, data:profiledata} = useQuery(GET_MY_PROFILE, {
    variables:{_id: localStorage.getItem("id")}
  },{

      fetchPolicy:"cache-and-network"
 
  },
  {
    refetchQueries:[
     { query: GET_ALL_QUOTES },
      { query: GET_MY_PROFILE }
    ]
} 


  );

  const [deleteQuote, { error:deleteerror }] = useMutation(DELETE_QUOTE,  
    {
      refetchQueries:[
       GET_MY_PROFILE 
      ]
  });




  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/login")
    }
    // console.log("param id", paramsRoute);
   
  })

  if (loading) return <h3>Profile Loading...</h3>
  if (error) return `Error! ${error.message}`;
  if (profiledata) console.log(profiledata, "pro_data");
            //  {/* console.log(quo ," quo_pro"); */}
        // console.log(data.user.quotes._id, "quote_data_name");


        const deleteQuoteById = async _id  =>  {
          
          console.log(_id);

          deleteQuote({ 
            variables: {
               _id: _id 
              }
          });

        }

  return (
    <>
   
      <div>
        <h1 className="profile_heading">Profile</h1>

        <div className='container1'>

          <div className="container_profile ">
            <div className="cover-photo">
              <img src={`https://robohash.org/${profiledata?.user.firstName}.png?size=200x200`}  alt="ProfilePic"   className="profile"/>
            </div>
            <div className="profile-name2">{profiledata?.user.firstName}</div>
            <p className="about2">Email - {profiledata?.user.email}</p>
           
          </div> 


          <div className='items2' >


              {
                profiledata?.user.quotes?.map(quo => {

                    console.log(quo, "quote_data_name");

       
                    return(
                      <blockquote>

                    

                          <div className='block_div inline-block-child'> 
                              {quo.name}
                          </div>

                          <div className='edit_btns inline-block-child'>

                            <Link
                              className="profilebtn btn btn-primary "

                              to={`/profile/quote/${quo._id}`}
                            >
                              <FaEdit/>
                            </Link>

                            <Link
                              className="profilebtn btn btn-danger"
                              to="/profile"
                              onClick={() => deleteQuoteById(quo._id)}
                            >
                              <MdDelete/>
                            </Link>

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
