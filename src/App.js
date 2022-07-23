import React, { useState,useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]); // intially we passed an empty array
  const [ isLoading, setIsLoading ] = useState(false); /* 7 */
  const [error, setError ] = useState(null);

  /*  const dummyMovies = [ // removing this dummy_data and fetching data from other site.
    {
      id: 1,
      title: 'Some Dummy Movie',
      openingText: 'This is the opening text of the movie',
      releaseDate: '2021-05-18',
    },
    {
      id: 2,
      title: 'Some Dummy Movie 2',
      openingText: 'This is the second opening text of the movie',
      releaseDate: '2021-05-19',
    },
  ]; */

  // function fetchMoviesHandler() { //  (((((((6)))))))
  //   /*fetch("https://swapi.dev/api/films") 
  //     .then((response) => {
  //       return response.json(); /* 2 */
  //     // })
  //     // .then((data) => {
  //     //   /* 5 */
  //     //   const transformedMovies = data.results.map(movieData => {
  //     //       return{
  //     //         id: movieData.episode_id,
  //     //         title: movieData.title,
  //     //         openingText: movieData.opening_crawl,
  //     //         releaseDate: movieData.release_date
  //     //       };
  //     //   });
  //     //   setMovies(transformedMovies); /* 3 */
  //     // });/* (1) */
  // }

  // useEffect(()=>{ /* 14 */
  //     fetchMoviesHandler(); /* 11 */
  // }, [fetchMoviesHandler]); /* 12 */

  // async function fetchMoviesHandler() { /* 12 */
  const fetchMoviesHandler = useCallback(async ()=> { /* 13 */
    setIsLoading(true); /* 8 */
    setError(null); /* 10 */

    try{
      // const response = await fetch('https://swapi.dev/api/films') /* 15 */
      const response = await fetch('https://react-http-70cf8-default-rtdb.firebaseio.com/movies.json') /* 15 */

      if(!response.ok){
        throw new Error('Something went wrong!'); // throwing error if ok returns false
      }

      // for removing the second then() using await again
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return{
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    
    }catch(error){
      // here we will be catching every error that we come across
      setError(error.message); // inside this error varaible message will come the reponse.ok returns false in that condition if block will throw an error
    }
    setIsLoading(false);// we kept this here, so that isLoading stops showing no matter whether we got succeed or got error
  }, []);

  useEffect(()=>{
    fetchMoviesHandler(); /* 11 */
}, [fetchMoviesHandler]); /* 12 */

function addMovieHandler(movie){
  console.log(movie);
}
  // these are the settings for the content variable written inside sections in return that content replaced the below code written in double dotted lines

    let content = <p> Found no movie. </p>

       if(movies.length > 0)
            content = <MoviesList movies = { movies } />
        
       if(error)
            content = <p> {error} </p>
        
       if(isLoading)
            content = <p> isLoading......</p>

  /* We can write the below conditions in more elegant way like just writing {content} insdie the <section> </section>

      ======================================================================================================
        { !isLoading && movies.length > 0 &&<MoviesList movies={ movies } /> }{/* 4 / /* 9 }
        { !isLoading && movies.length === 0 && !error && <p> Found no movies! </p>}
        { !isLoading && error && <p> { error } </p> }
        { isLoading && <p> Loading...... </p>} {/* 9 }
      =======================================================================================================

  */
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie = { addMovieHandler }></AddMovie>
      </section>
      <section>
        <button onClick = { fetchMoviesHandler }> Fetch Movies </button>
      </section>
      <section>
        {/* <MoviesList movies={dummyMovies} /> */}
          {content} {/* instead of this content we can also write all the above commented code written in jsx after the double dotted line */}
      </section>
    </React.Fragment>
  );
}

export default App;

/* (1) This fetch() function is made availabe to us by the browser. Inside this function we just need to pass an URL to which we want to
send the request. We provide fetch() fucntion a javascript object where we configure various options for example: providing an extra header
or an extra body or change the HTTP request method but here we don't need to pass an extra argument because the default method will be GET so
making the GET request. So get will send an HTTP request whenever this function fetchMoviesHandler is called.*/

/* in javascript fetch() method returns a promise, which tells the state of our request i.e. it is not always necesaary that our request will 
get succeed always it might fail also therefore after fetch we don't directly do other main work instead use some more fucntion like then() catch() */

/* then(): It executes whenever we get a response of our request from the server
   catch(): Used for handling any potential errors. */

/* the response argument that we get as the reply is actally a object with bunch of utilites fields which has certain utility functions too for example: json/body/header/status etc */

/* inside resoponse obj we will be getting json data and we need to convert it into javascript which we can easily by calling json() utility of response object.*/

/* this line inturn returns a promise which we will get once the data transformation is done by response.json() therefore again putting a then(). Inside this then() block we will get our transformed 
data wich in the case of our provided url will contain the properites of that data(in our case: count variable, next, results etc etc */

/* Since our data variable that we passed in second then() will contain transformed data having result field so we will access that result here. */

/*(3) we will store this result in some state. Therefore we passed this data inside setMovies useState function*/

/*(4) above line is commented because now we are using actually data fetched from backend not the dummy data. */

/*(5) now since our specified field in the Movie.js file is named different then the data we are getting from the SWAPI so we are transforming it's fields name first so that name confusion or problem 
don't become a problem. For this we are transforming every object of the given data into our own type object and all those object of our req type are then kept in the transformedMoives array. For example here
we are converting name episode_id to id , title to title (acc to code), opening_crawl to openingText.
The functin mentioned inside the map() function is returning a transformed brand new object to the transformedMoive array*/

/*(6) In place of then() blocks we can use async and await function, the line that is doing to return promise before that we write await and before the function name we write async by doing so the nesting of then() can
be prevented and the code can become more readable. Therefore commenting this portion ans using async and await. Now, whatever we where getting inside the response prop inside the fucntion of the then() block is now we will get
in the response variable  */

/* fetch() was returning a promise therefore we kept await before it. 
return response.json() was returning a promise therefore we kept await before it. */

/*(7) We made this state for isLoading message appearing on th screen. Initially it is false because directly it will not be shwoing the isLoading messagee*/

/*(8) when this function starts executing then setIsLoading(true) should start showing message*/

/*(9) if isLoading == false then movie list should appear but if it is true then Loading message should appear on the screen and movies.length > 0 should that we are chekcing that if have got movies inside our array then only
don't show the isLoading*/

/*(10) while sendign HTTP request we might get some error in our console so to show the users that there something went wrong we wanna or using useState() and handling it. Now when we are working with .then() wali method , then for
catching error we might add .catch() block also after then block as per our need but when we work with async await instead of .catch() block we use try() catch block */

/* FTP fetch() doesn't throw and error by itself if any problem occur or error occurs but the axios library does that thing therefore we are by our own checking that whether is there any error occurred while fetching the request that we are
  doing thorugh response.ok field. This field shows ok if there are no error but says false if we find any error. */

/* currently we are fetching data when the fetch movies button is clicked but generally in all the application the data is fetched when the page is reloaded or freshly opened but currently we are not doing this therefore we need to use useEffect()
 because sending this HTTP request is a side effect which ultimately changes our component state and we learnt that such sideEffect should go in useEffect. 
 Having HTTP get request and all in a fucntion is also fine as long as we don't call that function as main component function*/

 /* We can defnie useEffect either in the component function or outside the component fucntion. */

 /* this function will run whenver this function is re-evaluates. So, if we want that whenever this fucntion re-evaluates the useEffect() should run in that case we will put all the req dependencies inside useEffect() array */

 /*(12) Adding the function itself as the dependency because we want that whenever any change is made to the function we want that the movie should be fetched again but this will create an infinite loop therfore to avoid this problem we will use 
 useCallback() function */

 /*(13) Making the functon inside the parenthesis async here because we are using async and await */

 /*(14) moving this below because this is not initialized right now and being initialized below so we should use this after useCallback function */

 /*(15) we commented this because SWAPI was not allowing to send a post request therefore for that purpose we are using firebase and pasting its link in place of SWAPI */

 /*(16) movies.json will create a new node in that database basically. It is a dynammic REST API that you can configure here by using different segments to store data in diff nodes of your database and .json is something firebase specific, they need this .json
 at the end of the URL you are sending requests to, otherwise your request will fail*/
