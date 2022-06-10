
import { useQuery } from '@apollo/client';
import  {React, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { GET_ALL_QUOTES } from '../gqloperations/queries';
import "./Home.css"

const Home = () => {
  
  const navigate  = useNavigate();

 const {loading, error, data} = useQuery(GET_ALL_QUOTES, {
    fetchPolicy:"cache-and-network"
  });


 useEffect(() => {
  if(!localStorage.getItem("token")){
    navigate("/login")
  }

})


 if (loading) return 'Loading...';
 if (error) return `Error! ${error.message}`;
 if (data) console.log(data);
 if (data.quotes.length === 0)
  {
    return <h2>No Quotes Available</h2>
  }
  

  return (
    <>
        
        <div>
        
          <h1 className="home_heading">Home</h1>

          <div className='items_home' >

          {
            data.quotes?.map(quote =>{
              return(
                <div className='home_blockq'>

                  <div className='quote_home_div'> 
                    {quote.name}
                  </div>

                  <span>
                    {/* {quote.by.firstName} */}
                    <Link  to={`profile/${quote.by._id}`}  > - {quote.by.firstName}</Link>
                  </span>

                </div>

              )
            })
          }          
       
          </div>

        </div>

       

    </>
  )
}

export default Home;