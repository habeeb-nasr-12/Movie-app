import axios from "axios"
import  {useState, useEffect}  from  "react"
import { Link } from "react-router-dom"
import {Helmet} from "react-helmet"


export function TV(){
    
     
    <Helmet>


    <title>Tv shows</title>
    <meta name="description" content=" shows tv shows " />
 </Helmet>
    
    
    let [TvFirstPage,setTvFirstPage]= useState([])
    let [tvage,settvage]= useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
   let [tvapi,settvapi]= useState()
   let pagenumber
   function sendpagenumber(e){
    pagenumber= Number(e.target.id)+1
    settvapi(pagenumber)


   
}
 
    useEffect(function(){
     getTv(setTvFirstPage)
    
     
     
     },[])
     useEffect(function(){
        getTv(setTvFirstPage)
 
       
        
        
        },[tvapi])
 
  async function getTv(callback){
     let {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=e7534a5182e3acda6592ae86f20b30d9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${tvapi}&with_watch_monetization_types=flatrate`)
  callback(data.results )
   
 }
     return <> 
     
     <Helmet>


<title>TV shows</title>
<meta name="description" content="Tv shows " />
</Helmet>
     {TvFirstPage.length==0 ?<div className="lodingscreen top-0 d-flex align-items-center justify-content-center end-0 start-0 bottom-0 position-absolute">
     <i class="fa-solid fa-spinner fa-spin fa-4x"></i>
     </div>:  <div className="container w-75 py-4">

     <div className="row mt-2 g-4" >
 
 { TvFirstPage?.map(function(movie ,idx){ return<div key={idx} className="col-md-2"> 
<Link to={"/Moviedeatils/tv/"+movie.id}>
<div className="item">
      <img src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} className="w-100" alt="movie-img" />
        <h5 className="text-center my-2">{movie.original_name}</h5>
        </div>
</Link>

         </div>
     
 })}
 

       </div>

<div className="row">
   {tvage.map(function(page,idx){return <div className="row m-2 ">
  <span key={idx} id={idx} onClick={sendpagenumber} className=" btn-outline-info btn page      ">{page}</span> 
    </div> })}
   </div>

 

    
    
 
      </div>  

     }
  
  

 

  
  
 
 
 
 
 
  
     
     
     </>
 }
