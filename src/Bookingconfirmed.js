import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
 import './style.css';
import { useState } from 'react';

function Bookingconfirmed({useremail}) {
    const [list,setlist] = useState([])
    useEffect(async () => {
        fetchcar()
      }, [])
    
      let fetchcar = async () => {
        try {
          let itemdetials = await axios.get(`http://localhost:3003/confirmedbooking/${useremail}`,{
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

      let handleDelete = async (id) => {
        try {
            let result = window.confirm("Are you sure do you want to cancel?")
            if (result) {
                await axios.delete(`http://localhost:3003/cart/${id}` )
                fetchcar()
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
     <>
    <div className='container' id='ordercardcontainer'>
    {
        list.map((obj, index) => {
            
            return <div key={index}>
               
                <div class="card mt-4 ml-4" id='ordercard' style={{ width: "252px" }}>
                 <div class="card-body" id='odrcardbd'>
                     <span>
                    
 <p class="card-text" id='ordtxt'>{` ${obj.itemname} (${obj.quntity})`}</p>
 <p class="card-text" id='ordtxt'> {`Price-rs.${(obj.price)*(obj.quntity)}`}
</p>

                    <button className='btn'  onClick={() => handleDelete(obj._id)} 
                     id='xbtn'> <b id='xtxt'>X</b></button>
                     </span>
                    
                       
                     </div>
                     </div>
            </div>
        })
    }
    </div>
 </>
  )
}

export default Bookingconfirmed