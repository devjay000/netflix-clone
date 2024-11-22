import React, { useEffect, useRef, useState } from "react"
import './TitleCards.css'
import cards_data from "../../assets/cards/Cards_data"
import { Link } from "react-router-dom";


const TitleCards = ({title,category}) => {

    const [apiData,setApiData]=useState([]);
    const cardsRef=useRef(); //is used to create a reference, cardsRef, which will be attached to the div containing the list of cards.

    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjJlYWYwMzlmNjQ4NjZiNTEyNGRlOGI0YmE0YTA4YyIsIm5iZiI6MTcxOTkwNTUzMS42MDk2MzUsInN1YiI6IjY2ODNhYjJjNGEwYjk2OGI1YzcwMTUwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jlarJuU_H71q_YU4bh2baHPZpJ6vnh3SfaVUVeAKsOU'
        }
    };

    const handleWheel=(event)=>{ //handleWheel is a function that handles the wheel event
    event.preventDefault; //prevents the default scrolling behavior
    cardsRef.current.scrollLeft +=event.deltaY; //scrolls the div horizontally based on the vertical scroll amount.
}

//The useEffect hook adds an event listener to handle horizontal scrolling with the mouse whee
useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => setApiData(response.results))
        .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handleWheel);  
    
},[])
    return (
    <div className="title-cards">
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>
            {apiData.map((card,index)=>{
                //to={path}
                return <Link to={`/player/${card.id}`} className="card" key={index}>
                    <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                    <p>{card.original_title}</p>
                </Link>
            })}
        </div>
    </div>
    )
}
export default TitleCards