import react, { useEffect} from "react";
import { Link } from "react-router-dom";
import './App.css';

export default function Topbar({useremail}){
 return (
        <div>
             <nav class="navbar  navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"> 
            <input type='text' id='searchbar'></input>
            <div className="btn ml-2 btn-sm" id='searchbtn'>search</div>
                <div className="text-right  text-dark  "><b> </b></div>
                <span className="logregbtn">
                <Link to='/register'><button className="btn btn-sm " id='loginbtn' >Register</button></Link>
                <Link to='/login'><button className="btn btn-sm" id='regbtn' >Login</button></Link>
               
                </span>
                </nav>
                </div>
    )
}