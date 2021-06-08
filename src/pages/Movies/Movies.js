import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Genre from "../../components/Genre/Genre";
import Loading from "../../components/loading/Loading";
import CostumePagination from "../../components/Pagination/CostumePagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import { useGenre } from "../../hooks/useGenre";
import "./movies.css";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [pageNums, setPageNums] = useState(0);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [loading, setLoading] = useState();

  const num_genre = useGenre(selectedGenre);

  const fetchMovies = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}&with_watch_monetization_types=free&with_genres=${num_genre}`
    );
    setLoading(false);
    setContent(data.results);
    setPageNums(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page, num_genre]);

  return (
    <>
      <span className="pageTitle">Movies</span>
      <Genre
        type="movie"
        genre={genre}
        setGenre={setGenre}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        setPage={setPage}
      ></Genre>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="populars">
            {content &&
              content.map((c) => (
                <SingleContent
                  key={c.id}
                  id={c.id}
                  poster={c.poster_path}
                  name={c.name || c.title}
                  media_type="movie"
                  rating={c.vote_average}
                  date={c.first_air_date || c.release_date}
                />
              ))}
          </div>
          {pageNums >= 1 && (
            <ThemeProvider theme={darkTheme}>
              <CostumePagination setPage={setPage} numPages={pageNums} />
            </ThemeProvider>
          )}
        </>
      )}
    </>
  );
};

export default Movies;
