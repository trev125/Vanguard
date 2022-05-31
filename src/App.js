import "./App.css";
import SearchBar from "./components/search";
import NewUserPopUp from "./components/newUser";
import DailyQuestion from "./components/dailyQuestion";

const movies = require("./data/testMovies.json");
const movieResults = movies.results;
const movieTitles = [];
movieResults.forEach((movie) => {
  movieTitles.push({
    value: movie.original_title,
    label: movie.original_title,
    key: movie.id,
  });
});

function App() {
  return (
    <>
      <NewUserPopUp />
      <DailyQuestion />
      <SearchBar options={movieTitles} />
    </>
  );
}

export default App;
