import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import CostumePagination from "../../components/Pagination/CostumePagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./search.css";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
  },
});

const Search = () => {
  const [type, setType] = useState(0);
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(0);
  const [searchText, setSearchText] = useState("Batman");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchText}&page=1&include_adult=true`
    );
    setLoading(false);
    setContent(data.results);
    setNumPage(data.total_pages);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [page, type]);

  return (
    <>
      <span className="pageTitle">TV Series</span>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          ></TextField>
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={fetchData}
          >
            <SearchOutlined />
          </Button>
        </div>
        <Tabs
          value={type}
          onChange={(event, newValue) => {
            setType(newValue);
            console.log(newValue);
          }}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          <Tab label="Search Movie" style={{ width: "50%" }} />
          <Tab label="Search TV Series" style={{ width: "50%" }} />
        </Tabs>
      </ThemeProvider>

      {loading ? (
        <Loading></Loading>
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
                  media_type={type ? "tv" : "movie"}
                  rating={c.vote_average}
                  date={c.first_air_date || c.release_date}
                />
              ))}
          </div>
          {numPage >= 1 && (
            <ThemeProvider theme={darkTheme}>
              <CostumePagination setPage={setPage} numPages={numPage} />
            </ThemeProvider>
          )}
        </>
      )}
    </>
  );
};

export default Search;
