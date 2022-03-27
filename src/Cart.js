import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './style.css';
import { Link } from 'react-router-dom';

function Cart({useremail,setbill}) {
var sum = 0;
var billarray=[];
  const [cartarr, setcartarr] = useState([]);
   useEffect(async () => {
    fetchcart()
  }, [])

  let fetchcart = async () => {
    try {
      let itemdetials = await axios.get(`http://localhost:3003/cart/${useremail}`);
      console.log(itemdetials.data);
      setcartarr(itemdetials.data)
       
      
    } catch (error) {
      console.log(error)
    }
  }

  let handleDelete = async (id) => {
    try {
        let result = window.confirm("Are you sure do you want to cancel the order?")
        if (result) {
            await axios.delete(`http://localhost:3003/cart/${id}` )
            fetchcart()
        }
    } catch (error) {
        console.log(error)
    }
}


let calculate = async (id) => {
  try {
      var orderinfo = await axios.get(`http://localhost:3003/itemcart/${id}`,{
        headers: {
            Authorization: window.localStorage.getItem("my_token")
        },
})
console.log(orderinfo.data)
setbill((orderinfo.data[0].price)*(orderinfo.data[0].quntity))      


  } catch (error) {
      console.log(error)
  }
}

  return (
    <>
      <div style={{ width: 'auto' }}> <h3>Cart</h3></div>
      
      <div className='container' id='cardcontainer'>
        {
  cartarr.map((obj, index) => {
 
            return <div key={index}>
              
              <div class="card mt-4 ml-4" id='card' style={{ width: "252px" }}>
                <p class="card-text mt-1">{obj.itemname}</p>

                <div class="card-body" id='cardbody'>
                  <p class="card-text">{`₹ ${obj.price} * ${obj.quntity}`}</p>
                  <p class="card-text">{`item total - ₹${(obj.quntity) * (obj.price)}`}</p>
                 <Link to={`/editcart/${obj._id}`}><button 
                  className='btn btn-sm'  id='pynowbtn'><b>Edit</b></button></Link>
                  <button onClick={() => handleDelete(obj._id)} 
                  className='btn btn-sm'  id='pynowbtn'><b>cancel</b></button>
                
                  <Link to={`/payment/${obj._id}`}> 
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

export default Cart