import React,{Component} from 'react';
import axios from "axios";
import Movie from "../component/Movie.js"
import './Home.css';



class Home extends Component {
  state={
    isLoading : true,
    movies : []
  };

  getMovies = async()=>{
    const {data: {data : {movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    console.log(movies);

    this.setState({movies, isLoading: false});

    //console.log(movies.data.data.movies);

    /* 
    async 데이터를 다 가져올 때 까지 기다림
    await 어떤 걸 기다리게? 이거 
    */
  };

  componentDidMount(){
    this.getMovies();
  }

  render(){
    const {isLoading,movies} = this.state;
    return (
        <section className="container">
          {isLoading ? 
          <div className="loader">
            <span className="loader_text">Loading...</span>
          </div> : (
            <div className="movies">
              {movies.map(movie=>(
              <Movie key={movie.id} id={movie.id} year={movie.year} title={movie.title} summary={movie.summary} poster={movie.medium_cover_image} genres={movie.genres}></Movie>
              ))}
            </div>
          )}
        </section>
   
    );
  }
}

export default Home;
