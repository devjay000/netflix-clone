import React from "react"
import { useState ,useEffect} from "react"
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from "react-router-dom"
const Player = () => {
    
    const {id}=useParams();
    const navigate=useNavigate();

    const  [apiData, setApiData] = useState({
        name:"",
        key:"",
        published_at:"",
        type:""
    });
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjJlYWYwMzlmNjQ4NjZiNTEyNGRlOGI0YmE0YTA4YyIsIm5iZiI6MTcxOTkwNTUzMS42MDk2MzUsInN1YiI6IjY2ODNhYjJjNGEwYjk2OGI1YzcwMTUwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jlarJuU_H71q_YU4bh2baHPZpJ6vnh3SfaVUVeAKsOU'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        .then(response => response.json())
        .then(response => setApiData(response.results[0]))
        .catch(err => console.error(err));
    }, [])
    

    return (
    <div className="player">
        <img src={back_arrow_icon} alt="back_arrow" onClick={()=>{navigate(-2)}}/>
        <iframe  width='90%' height='90%'  src={`https://www.youtube.com/embed/${apiData.key}`} title="trailer" frameBorder='0' allowFullScreen></iframe>
        <div className="player-info">
            <p>{apiData.published_at.slice(0,10)}</p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
        </div>
    </div>
    )
}
export default Player