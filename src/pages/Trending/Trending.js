import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import CostumePagination from "../../components/Pagination/CostumePagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./trending.css";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

    setContent(data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      <span className="pageTitle">Popular Now</span>
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
                  media_type={c.media_type}
                  rating={c.vote_average}
                  date={c.first_air_date || c.release_date}
                />
              ))}
          </div>
          <ThemeProvider theme={darkTheme}>
            <CostumePagination setPage={setPage} />
          </ThemeProvider>
        </>
      )}
    </>
  );
};

export default Trending;
