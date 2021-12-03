import React from 'react'
import {useState} from "react"
import { AiOutlineUser,AiOutlineMail ,AiOutlineLock} from 'react-icons/ai'
import {
    Navigate,
    useNavigate
  } from "react-router-dom";
  import {loginUser} from "../services/userServices" 
  import axios from "axios"
  import {useDispatch,useSelector} from "react-redux"
  import {getUser} from "../config/Redux/Actions/userActions"

function Login() {
    const [user, setUser] = useState({email:"",password:""})
    const [isLoading,setIsLoading]=useState(false)
    const navigate = useNavigate ()
    const dispatch = useDispatch()
    const state = useSelector(state => state)

    function handleChange(e)
    { 
   setUser({...user,[e.target.name]:e.target.value})
    }

    async function login(e)
    {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await loginUser(user)
            localStorage.setItem("token",response.token)
            axios.defaults.headers.common['Authorization'] = response.token
            dispatch(getUser()).then((res)=>{
                setIsLoading(false)
                alert(response.message)
                setUser({email:"",password:""})
                navigate("/")

            })
      

        } catch (error) {
            setIsLoading(false)
            if(error.message){
                return alert(error.message)
               }
               else {
                   console.log(error)
               }
          
        }
     
        
        
    }
    return (
        <>
        {/* {props.user && <Navigate to="/"/> } */}
        <div className="user_form">
            <h1>Login</h1>
            <form method="POST" onSubmit={login} className="form_wrapper">
                <div>
                    <div>
                        <AiOutlineMail style={{ fontSize: "20px", color: "blue", resize: "none" }} />
                    </div>

                    <input disabled={isLoading} value={user.email} placeholder="Email" required name="email" onChange={e=>handleChange(e)} />
                </div>
                <div>
                    <div>
                        <AiOutlineLock style={{ fontSize: "20px", color: "blue", resize: "none" }} />
                    </div>

                    <input disabled={isLoading} value={user.password} type="password" name="password" placeholder="Password" required onChange={e=>handleChange(e)} />
                </div>
                {isLoading ? <h4 style={{alignSelf:"flex-end"}}>Loading...</h4> : <button className="login">Login</button> } 

            </form>
            

        </div>
        </>
    )
}

export default Login
