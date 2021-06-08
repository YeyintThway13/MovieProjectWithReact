import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Movie, Search, Tv, Whatshot } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    bottom: 0,
    position: "fixed",
    backgroundColor: "#333",
  },
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = useState("popular");
  const history = useHistory();

  useEffect(() => {
    if (value === "popular") history.push("/");
    else if (value === "movies") history.push("/movies");
    else if (value === "tv") history.push("/tvseries");
    else if (value === "search") history.push("/search");
  }, [value, history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className={classes.root}
    >
      <BottomNavigationAction
        style={{ color: "#fff" }}
        label="Popular"
        value="popular"
        icon={<Whatshot />}
      />
      <BottomNavigationAction
        style={{ color: "#fff" }}
        label="Movies"
        value="movies"
        icon={<Movie />}
      />
      <BottomNavigationAction
        style={{ color: "#fff" }}
        label="TV Series"
        value="tv"
        icon={<Tv />}
      />
      <BottomNavigationAction
        style={{ color: "#fff" }}
        label="Search"
        value="search"
        icon={<Search />}
      />
    </BottomNavigation>
  );
}
