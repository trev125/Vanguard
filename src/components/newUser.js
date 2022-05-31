import { useState, useEffect } from "react";

const defaultGameLocalStorage = {
  guessedMovies: [],
  guessedMoviesAccuracy: [],
  gameStatus: "IN_PROGRESS",
  solution: "Frankenstein",
};

const defaultUserLocalStorage = {
  currentStreak: 0,
  maxStreak: 0,
  winPercentage: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  averageGuesses: 0,
};

const NewUserPopUp = () => {
  // const [isFirstTimeHere, setIsFirstTimeHere] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Welcome -- is it your first time? (It is, we know 😉)"
  );

  useEffect(() => {
    if (localStorage.getItem("hasVisited")) {
      setWelcomeMessage("Welcome back!");
      // TODO: DELETE ME
      localStorage.setItem(
        "vanguard-state",
        JSON.stringify(defaultGameLocalStorage)
      );
    } else {
      localStorage.setItem("hasVisited", "true");
      localStorage.setItem(
        "vanguard-state",
        JSON.stringify(defaultGameLocalStorage)
      );
      if (!localStorage.getItem("vanguard-user-state")) {
        localStorage.setItem(
          "vanguard-user-state",
          JSON.stringify(defaultUserLocalStorage)
        );
      }
    }
  }, []);

  return (
    <>
      <div>{welcomeMessage}</div>
    </>
  );
};

export default NewUserPopUp;
