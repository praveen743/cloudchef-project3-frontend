import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Customorderpayment() {
    var navigate = useNavigate();
    const[list,setlist] = useState([]);
    var params = useParams();
    useEffect(async () => {
        confirmorder()
      }, [])
    
       

      let confirmorder = async () => {
        try {
          let itemdetials = await axios.put(`http://localhost:3003/custompayorder/${params.id}`);
            navigate('/mycustomorder')
           
        } catch (error) {
          console.log(error)
        }
      }

    
  return (
    <div>Loading...</div>
  )
}
 
export default Customorderpayment