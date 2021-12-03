import React from 'react'
import {
    Link,
    useNavigate
  } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import {logOutUser} from "../services/userServices"
import axios from 'axios';

function Header() {
    const state = useSelector(state => state)
    const navigate = useNavigate ()
const dispatch = useDispatch()
  async function logout()
    {
        try {
            const response = await logOutUser()
            alert(response.message)
            localStorage.setItem("token","")
            axios.defaults.headers.common['Authorization'] = ""
            dispatch({type:"USER_LOGOUT"})
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="header_wrapper">
            <div className="logo">
                <Link to="/" style={{textDecoration:"none",color:"white"}}>
                <h1>Todo App</h1>  
                </Link>
               
            </div>
            <div className="action_btn">
                {
                    !state.user.isAuth ? <> <Link to="/signup">
                    <button>Register</button>
                    </Link>
                    <Link to="/login">
                    <button>Login</button>
                    </Link> </>: <button onClick={logout}>Logout</button>
                }
               
                
                
                
            </div>
        </div>
    )
}

export default Header
