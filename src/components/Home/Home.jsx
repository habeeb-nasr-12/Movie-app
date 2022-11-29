import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet"



export function Home(){
    
    




   let [trendingMovies,setTrendingMovies]= useState([])
   let [trendingTV,setTrendingTv]= useState([])

   useEffect(function(){
    getTrending("movie",setTrendingMovies)
      getTrending("tv",setTrendingTv)
    console.log(trendingMovies)
    
    
    },[])

 async function getTrending(type,callback){
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${type}/week?api_key=e7534a5182e3acda6592ae86f20b30d9`)
 callback(data.results.splice(0,10) )
  
}
    return <> 
    
    <Helmet>


<title>Movie app </title>
<meta name="description" content="Movie app" />
</Helmet>
    {trendingMovies.length==0 && trendingTV.length==0 ?<div className="lodingscreen top-0 d-flex align-items-center justify-content-center end-0 start-0 bottom-0 position-absolute">
    <i class="fa-solid fa-spinner fa-spin fa-4x"></i>
    </div>: 
 <div className="container w-75 py-2">
    <div className="row mt-2 g-4" >
<div className="col-md-4">
<div className="item">
<h2>Trending movies to watch now </h2> 
<p className="home-text">most watched movies by days</p>

</div>

</div>
{ trendingMovies.map(function(movie ,idx){ return<>


<div key={idx} 

className="col-md-2">
   <Link to={"/Moviedeatils/movie/"+ movie.id}>
   <div className="item">
   <img src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} className="w-100" alt="movie-img" />
       <h5 className="text-center my-2">{movie.title}</h5>
   </div>
   </Link>


    

</div>





</> })}

    </div>
    <div className="row mt-2 g-4" >
<div className="col-md-4">
<div className="item">
<h2>Trending Tv to watch now </h2> 
<p className="home-text">most watched Tv by days</p>

</div>

</div>
{ trendingTV.map(function(movie ,idx){ return<>

<div key={idx} className="col-md-2">
<Link  to={"/Moviedeatils/tv/"+movie.id}>
    <div className="item">
    <img src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} className="w-100" alt="movie-img" />
       <h5 className="text-center my-2">{movie.original_name}</h5>
       </div>
       </Link>
    </div>


</> })}

    </div>
 




 </div>
}
 
    
    
    </>
}