import { Link, useNavigate } from "react-router-dom";


export function Navbar({loggedInUser ,remove} ){

  let navigate = useNavigate()


function logout(){
   
  remove()
  navigate("./Login")



}





    return <>
    
    <nav className="navbar navbar-expand-lg navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand fw-bold" to={"/Home"}>Noxe</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

     {loggedInUser?<>
      <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Tv">Tv shows</Link>
        </li>
     </>: "" }   
       
   
        
         
      </ul>
   

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item d-flex align-items-center">
       <i className="fa-brands me-3 fa-facebook"> </i>
       <i className="fa-brands me-3 fa-instagram"> </i>
       <i className="fa-brands me-3 fa-spotify"> </i>
       <i className="fa-brands me-3 fa-twitter"> </i>
        </li>

     {loggedInUser?  <li className="nav-item">
          <span onClick={logout} className="nav-link logout">Log out</span>
        </li> : <>
        <li className="nav-item">
          <Link className="nav-link" to="/Register">Register</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" to="/LOGIN">Login</Link>
        </li>
        </>}   
    
   
      
   
        
         
      </ul>
     
    </div>
  </div>
</nav>
    
    
    </>
}