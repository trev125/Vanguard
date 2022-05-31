/* eslint-disable no-unused-vars */
import Select, { components } from "react-select";
import { useState, useEffect, useCallback } from "react";

const controlStyles = {
  border: "1px solid black",
  padding: "5px",
  background: "pink",
  color: "white",
  width: "40%",
};

// const menuStyles = {
//   width: "40%",
//   overflow: "visible",
// };

// const MenuComponent = (props) => {
//   // <div style={menuStyles}>
//   //   <p>Custom Menu</p>
//   //   <components.Menu {...props} />
//   // </div>;
//   <div style={menuStyles}>
//     <components.Menu style={menuStyles} {...props}>
//       {props.children}
//     </components.Menu>
//   </div>;
// };

// localStorage.setItem('user', JSON.stringify(user));

// const user = JSON.parse(localStorage.getItem('user'));

const ControlComponent = (props) => (
  <div style={controlStyles}>
    <p>Custom Control</p>
    <components.Control {...props} />
  </div>
);

const SearchBar = (props) => {
  const movieTitles = props.options;
  const [currentMovie, setCurrentMovie] = useState("");
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [guessedTooMuch, setGuessedTooMuch] = useState(false);
  const [hasSelectedCorrectMovie, setHasSelectedCorrectMovie] = useState(false);
  const [isFirstTimeHere, setIsFirstTimeHere] = useState(true);

  // const isUserNew = () => {
  //   if (isFirstTimeHere && !localStorage.getItem("vanguard-state")) {
  //     localStorage.setItem(
  //       "vanguard-state",
  //       JSON.stringify(defaultGameLocalStorage)
  //     );
  //     if (!localStorage.getItem("vanguard-user-state")) {
  //       localStorage.setItem(
  //         "vanguard-user-state",
  //         JSON.stringify(defaultUserLocalStorage)
  //       );
  //     }
  //     setIsFirstTimeHere(false);
  //   }
  // };

  // isUserNew();

  // TODO: update the overall user stats
  const userFailed = (gameState) => {
    gameState.gameStatus = "FAIL";
    localStorage.setItem("vanguard-state", JSON.stringify(gameState));
    const userState = JSON.parse(localStorage.getItem("vanguard-user-state"));
    userState.maxStreak = 0;
    userState.currentStreak = 0;
    userState.gamesPlayed++;
    userState.averageGuesses = Math.round(
      (userState.averageGuesses + gameState.guessedMovies.length) /
        userState.gamesPlayed
    );
    localStorage.setItem("vanguard-user-state", JSON.stringify(userState));
  };

  const userWon = (gameState) => {
    // Update the single game status
    gameState.gameStatus = "WIN";
    localStorage.setItem("vanguard-state", JSON.stringify(gameState));

    // Update the ongoing game status
    const userState = JSON.parse(localStorage.getItem("vanguard-user-state"));
    userState.currentStreak++;
    userState.maxStreak++;
    userState.gamesWon++;
    userState.gamesPlayed++;
    userState.averageGuesses = Math.round(
      (userState.averageGuesses + gameState.guessedMovies.length) /
        userState.gamesPlayed
    );
    localStorage.setItem("vanguard-user-state", JSON.stringify(userState));
    // TEMP: DELETE LATER
    // localStorage.setItem(
    //   "vanguard-state",
    //   JSON.stringify(defaultGameLocalStorage)
    // );
    setHasSelectedCorrectMovie(true);
  };

  const updateMoviesGuessed = (userSelectedMovie) => {
    const gameState = JSON.parse(localStorage.getItem("vanguard-state"));
    gameState.guessedMovies.push(userSelectedMovie);
    localStorage.setItem("vanguard-state", JSON.stringify(gameState));
    setSelectedMovies((selectedMovies) => [
      ...selectedMovies,
      userSelectedMovie,
    ]);
    console.log(selectedMovies);
    if (gameState.guessedMovies.length > 5) {
      userFailed(gameState);
    }
  };

  const submitMovie = (userSelectedMovie) => {
    updateMoviesGuessed(userSelectedMovie);
    const gameState = JSON.parse(localStorage.getItem("vanguard-state"));
    if (userSelectedMovie.value === gameState.solution) {
      userWon(gameState);
    }
  };

  const hasUserWon = () => {
    const gameState = JSON.parse(localStorage.getItem("vanguard-state"));
    if (gameState.gameStatus === "WIN") {
      setHasSelectedCorrectMovie(true);
    }
  };

  // // const moviesChosen = [];
  // useEffect(() => {
  //   if (localStorage.getItem("numberOfGuesses") > 5) {
  //     setGuessedTooMuch(true);
  //     updateNumberOfGuessesLocalStorage(0);
  //   }
  // }, [cookies.numberOfGuesses, updateNumberOfGuessesLocalStorage]);

  return (
    <>
      {console.log(selectedMovies)}
      {selectedMovies.map((movie) => {
        return <p key={movie.id}>{movie.value}</p>;
      })}
      {!hasSelectedCorrectMovie && !guessedTooMuch ? (
        <div>
          <Select
            defaultValue=""
            components={{ Control: ControlComponent }}
            isSearchable
            name="Movie Titles"
            onChange={submitMovie}
            options={movieTitles}
          />
        </div>
      ) : hasSelectedCorrectMovie ? (
        <div>
          <p>you win!</p>
        </div>
      ) : (
        <p>poo poo you lose</p>
      )}
    </>
  );
};

export default SearchBar;
