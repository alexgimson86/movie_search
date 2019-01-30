import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery'
class App extends Component {
  constructor(props){
    super(props)
    const movies = [
      {id: 0, poster_src: "https://image.tmdb.org/t/p/w185/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", title: "Avengers: Infinity War", overview: "The Avengers fight Thanos."},
      {id: 1, poster_src: "https://image.tmdb.org/t/p/w185/cezWGskPY5x7GaglTTRN4Fugfb8.jpg", title: "The Avengers", overview: "The Avengers fight Loki."}
    ]
    var movieRows = [];
    movies.forEach((movie) =>{
    const movieRow =(
      <div key={movie.id}>
        <img alt="movie poster" src={movie.poster_src}></img>
        {movie.title}
        {movie.overview}
     </div> )
     movieRows.push(movieRow);
    })
    this.state = {
      rows: movieRows,
      movieName: ''
    }
  }
  handleChange = (e) => {
    var movieRows = [];
    this.setState({[e.target.name]: e.target.value })
    $.ajax({
      url:`https://api.themoviedb.org/3/search/movie?api_key=baf70dcc60ac4c339602a8f30a38501d&language=en-US&query=${e.target.value}&page=1&include_adult=true`
      
    })
  .done(function(movies) {
    movies.results.forEach((movie)=>{
      let s = "https://image.tmdb.org/t/p/w185/"
      s += movie.poster_path
      let avg = Math.floor(movies.vote_average)
      const movieRow = (<div key={movie.id}>
          <img alt="movie poster" src={s}></img>
        <h3>Title: </h3><h1><b>{movie.title}</b></h1><br/>
         <h3>Overview: </h3> <p>{movie.overview}</p>
         <h3>Vote average: </h3><p>{movie.vote_average} out of 10 stars</p>
         <hr></hr>
      </div>)
      movieRows.push(movieRow)
    })
    this.setState({rows: movieRows})
  }.bind(this))
}
    
  
  render() {
    return (
      <div className="App">
        <input onChange={this.handleChange} name="movieName" id="inputField" placeholder="Enter your movie"></input>
        {this.state.rows}
      </div>
    );
  }
}

export default App;
