import jwtDecode from "jwt-decode"
import { useState } from "react"
import { createBrowserRouter, createHashRouter, Navigate, RouterProvider } from "react-router-dom"
import { Home } from "./components/Home/Home"
import { Login } from "./components/Login/Login"
import { Main } from "./components/Main/Main"
import { Movedeatils } from "./components/Moviedetials/Moviedeatils"
import { Movies } from "./components/Movies/Movies"
import { Register } from "./components/Register/Register"
import { TV } from "./components/TV/Tv"
import {useEffect} from "react"

 


export default function App(){
  let [loggedInUser,setLoggedInUser]= useState(null)



function ProtectedRoute(props){

if (localStorage.getItem('tkn') == null ){
  return <Navigate to={"/login"} />
}
else{
  
return <> { props.children }</>

}



}






  function remove(){
    localStorage.removeItem("tkn")
    setLoggedInUser(null)
  }



  function getUserData(){
    if (localStorage.getItem("tkn") != null ){
    let token = localStorage.getItem("tkn")
    let userData= jwtDecode(token)
    setLoggedInUser(userData)
   
    }

  }

  function checkRealod(){

if(localStorage.getItem("tkn") != null && loggedInUser == null ){

  getUserData()
}
   
  }



  useEffect(function(){
  checkRealod()
  },[])
  


 const router =  createHashRouter([
    { path: "", element : <Main  remove={remove}   loggedInUser={loggedInUser} /> ,children:[
      {path:"", element : <ProtectedRoute><Home/></ProtectedRoute> } ,
      {path:"/Home", element :<ProtectedRoute>  <Home/>  </ProtectedRoute> } ,
      {path:"/Tv", element : <ProtectedRoute> <TV/></ProtectedRoute> } ,
      {path:"/Movies", element :<ProtectedRoute> <Movies/></ProtectedRoute> } ,
      {path:"/Moviedeatils/:media/:id", element : <ProtectedRoute> <Movedeatils/></ProtectedRoute>} ,
      {path:"/LOGIN", element :  < Login Loginver={getUserData}  />   } ,
      {path:"/Register", element :  <Register/>  },
      {path:"*", element : <h2 className="text-center">opps this page is not found</h2> },


    ]}
  ])


  return <>
  
<RouterProvider router={router}/>
  
  
  </>
}