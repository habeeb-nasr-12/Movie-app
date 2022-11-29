import axios from "axios"
import   {useState,useEffect}    from "react"
import { useParams } from "react-router-dom"



export  function Movedeatils(){

let [objDeatils,setObjDeatils] = useState(null)
 let {media,id}= useParams()
    async function getDeatils(){

    let {data} = await axios.get(`https://api.themoviedb.org/3/${media}/${id}?api_key=e7534a5182e3acda6592ae86f20b30d9&language=en-US`) 
    setObjDeatils(data)

   


    }
useEffect(function(){

    getDeatils()
})


    return<>
   

  
    {objDeatils==null? <div className="lodingscreen top-0 d-flex align-items-center justify-content-center end-0 start-0 bottom-0 position-absolute">
    <i class="fa-solid fa-spinner fa-spin fa-4x"></i>
    </div>: <div className="container w-75 py-4">
    <div className="row">
<div className="col-md-6">
<div className="poster">
    <a href={objDeatils.homepage} target="_blank">
    <img src={"https://image.tmdb.org/t/p/w500" + objDeatils.poster_path} className="w-100  rounded" alt="movie poster" />
    </a>
</div>
</div>
<div className="col-md-6">
<div className="moviedet">
    <h2 className="my-2">{objDeatils.original_title}</h2>
    <p className="text muted mb-5 mt-3">{objDeatils.overview}</p>
 {objDeatils.genres?.map(function (movie,idx){
    return <span key={idx} className="bg-info  text-center row rounded p-2 m-4">{movie.name}</span>
 })}
    <p className="my-5"> vote : {objDeatils.vote_average}</p>
    <p className="my-5"> vote count :  {objDeatils.vote_count}</p>
    <p className="my-5"> popularity:  {objDeatils.popularity} </p>
    <p className="my-5"> release data:  {objDeatils.release_date}</p>
    
</div>

 </div>



    </div>
</div> }
   
    
    
    
    </>
}