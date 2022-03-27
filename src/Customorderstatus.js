import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';



function Customorderstatus({useremail,setcustombill}) {
    const[list,setlist]= useState([]);
    useEffect(async () => {
        fetchcar()
      }, [])
    
      let fetchcar = async () => {
        try {
          let itemdetials = await axios.get(`http://localhost:3003/ytorderstatus/${useremail}`,{
            headers: {
                Authorization: window.localStorage.getItem("my_token")
            }
        });
          console.log(itemdetials.data)
           setlist(itemdetials.data)
        } catch (error) {
          console.log(error)
        }
      }

      let calculate = async (id) => {
        try {
            var orderinfo = await axios.get(`http://localhost:3003/ytorder/${id}`,{
              headers: {
                  Authorization: window.localStorage.getItem("my_token")
              },
      })
      console.log(orderinfo.data[0].orderprice)
      setcustombill(orderinfo.data[0].orderprice)      
      
      
        } catch (error) {
            console.log(error)
        }
      }

  return (
    <>
     
    <div className='container' id='cardcontainer'>
      {
list.map((obj, key) => {
 
          return <div>
            <div class="card mt-4 ml-4" id='card' style={{ width: "252px" }}>
              
                <div class="card-body" id='cardbody'>
                <p class="card-text">{`Order Status - ${obj.status}`}</p>
                <p class="card-text">{`Order Price - ${obj.orderprice}`}</p>
                <p class="card-text">Pay Now To Confirm Your Order</p>
                <Link to={`/custuompayment/${obj._id}`}> 
                                  <button className='btn btn-sm '
                                     id='pynowbtn'    onClick={() => calculate(obj._id)}
                                    >Pay Now</button></Link> 
              </div>
            </div>
          </div>
        })
      }

    </div>
  </>
  )
}

export default Customorderstatus