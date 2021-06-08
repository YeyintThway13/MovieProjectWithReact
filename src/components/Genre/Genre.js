import { Chip, createMuiTheme, ThemeProvider } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
});

const Genre = ({
  genre,
  setGenre,
  selectedGenre,
  setSelectedGenre,
  type,
  setPage,
}) => {
  const fetchGenre = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenre(data.genres);
  };

  useEffect(() => {
    fetchGenre();

    // eslint-disable-next-line
  }, []);

  const handleAdd = (g) => {
    setSelectedGenre([...selectedGenre, g]);
    setGenre(genre.filter((item) => item.name !== g.name));
    setPage(1);
  };

  const handleRemove = (g) => {
    setGenre([...genre, g]);
    setSelectedGenre(selectedGenre.filter((item) => item.name !== g.name));
    setPage(1);
  };

  return (
    <>
      {selectedGenre &&
        selectedGenre.map((g) => (
          <ThemeProvider theme={darkTheme}>
            <Chip
              label={g.name}
              clickable
              size="small"
              variant="outlined"
              style={{ margin: 2 }}
              color="secondary"
              onDelete={() => handleRemove(g)}
            />
          </ThemeProvider>
        ))}
      {genre &&
        genre.map((g) => (
          <ThemeProvider theme={darkTheme}>
            <Chip
              label={g.name}
              clickable
              size="small"
              variant="outlined"
              color="primary"
              style={{ margin: 2 }}
              onClick={() => handleAdd(g)}
            />
          </ThemeProvider>
        ))}
    </>
  );
};

export default Genre;
