import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';

function Dashboard() {
    var cartarr = [];
    const [menuarr, setmenuarr] = useState([]);
    const [quntity, setquntity] = useState(0);
    const [cart, setcart] = useState();
    var params = useParams();
    useEffect(async () => {
        fetchmenu()
    }, [])

    let fetchmenu = async () => {
        try {
            let menu = await axios.get(`http://localhost:3003/menu`, {
                headers: {
                    Authorization: window.localStorage.getItem("my_token")
                }
            });
            setmenuarr(menu.data)
        } catch (error) {
            console.log(error)
        }
    }

    

    return (
        <>
             <div className='container' id='cardcontainer'>
                {
                    menuarr.map((obj, key) => {
                        return <div>
                            <div class="card mt-4 ml-4" id='card' style={{ width: "252px" }}>
                                <p class="card-text mt-1">{obj.description}</p>
                                <img class="card-img-top" id='image' src={obj.url} alt="Card image cap" />
                                <div class="card-body">
                                    <p class="card-text">{`₹ ${obj.price}`}</p>
                                    
                                  <Link to={`/additem/${obj._id}`}> <button className='btn  btn-light'
                                         
                                    ><b>ADD</b></button></Link> 
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </>

    )
}

export default Dashboard


