import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";


export function Main({loggedInUser ,remove}){


    return <>
    
  <Navbar loggedInUser={loggedInUser}  remove={remove}   />
    <Outlet/>
    
    </>
}