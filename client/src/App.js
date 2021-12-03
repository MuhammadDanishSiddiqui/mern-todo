import { useState } from "react"
import './App.css';
import Header from "./components/Header"
import Todos from './components/Todos';
import SignUp from "./components/singUp"
import Login from "./components/login"
import {
  Routes ,
  Route,
  useLocation,
  useNavigate,
  Navigate
} from "react-router-dom";

import { useSelector,useDispatch } from 'react-redux'
import {useEffect} from "react"
import { getUser } from "./config/Redux/Actions/userActions";
import axios from "axios";



function App() {
const navigate = useNavigate()
const state = useSelector(state => state)
const dispatch = useDispatch()
const location  = useLocation()
useEffect(()=>{
  if(localStorage.getItem("token"))
{
  axios.defaults.headers.common['Authorization'] = localStorage.getItem("token")
  dispatch(getUser()).then(()=>{
    navigate(localStorage.getItem("currentPath"))
  })
}

},[])
useEffect(() => {
  localStorage.setItem("currentPath",location.pathname)
}, [location])
  return (
    <>
      <Header/>
      <Routes >
      <Route exact path="/" element={  state?.user?.isLoading && !state.user.isAuth  ? <p className="welcome">Loading...</p> : !state?.user?.isAuth && !state.user.isLoading ?  <div className="welcome">
          <h3>Please login to see your Todos</h3>
        </div> : <Todos />}/>
        <Route exact path="/signup" element={ state?.user?.isAuth  ? <Navigate to="/"/> :  <SignUp/>}/>
        <Route exact path="/login" element={state?.user?.isAuth  ? <Navigate to="/"/> : <Login/>}/>
      </Routes >



    </>
  );
}

export default App;
