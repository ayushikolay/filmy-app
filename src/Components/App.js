import React from 'react';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { data } from '../data';
import { addMovies, setShowFavourites } from '../actions';

class App extends React.Component {

  componentDidMount() {
    const {store} = this.props;
    store.subscribe(() => {
      console.log("Updated");
      this.forceUpdate();
    });
    //make api call
    //dispatch action
    // store.dispatch({
    //   type: 'ADD_MOVIES',
    //   movies: data
    // });
    store.dispatch(addMovies(data));
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();
    const { favourites } = movies;
    const index = favourites.indexOf(movie);

    if(index !== -1)
    {
      return true;
    }
    return false;
  }

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  }
  render() {
  // const movies= this.props.store.getState();
  const { movies, search } = this.props.store.getState();
  const { list, favourites, showFavourites } = movies;
  console.log("RENDER");

  const displayMovies = showFavourites ? favourites : list;
  return (
    <div className="App">
      <Navbar dispatch = {this.props.store.dispatch} search={search} />
      <div className="main">
        <div className="tabs">
          <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)} >Movies</div>
          <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)} >Favourites</div>
        </div>
        {/* <div className="list">
          {data.map((movie, index) =>(
            <MovieCard movie = {movie} key={`movies-${index}`} />
          ))}
        </div> */}
        <div className="list">
          {displayMovies.map((movie, index) =>(
            <MovieCard
             movie = {movie}
             key={`movies-${index}`} 
             dispatch={this.props.store.dispatch} 
             isFavourite={this.isMovieFavourite(movie)}
            />
          ))}
        </div>
        {displayMovies.length === 0 ? <div className="no-movies">No movies to display!</div> : null}
      </div>
    </div>
  );
}
}
export default App;
 