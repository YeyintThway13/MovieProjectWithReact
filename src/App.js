import React from "react";
import Header from "./components/Header/Header";
import "./app.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import Trending from "./pages/Trending/Trending.js";
import Movies from "./pages/Movies/Movies";
import TvSeries from "./pages/TvSeries/TvSeries";
import Search from "./pages/Search/Search";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/tvseries" component={TvSeries}></Route>
            <Route path="/search" component={Search}></Route>
          </Switch>
        </Container>
        <div className="scrollup" onClick={() => window.scroll(0, 0)}>
          <ArrowUpwardIcon style={{ color: "#333" }} />
        </div>
      </div>
      <div className="footer">Created By Ye'yint Thway</div>
    </BrowserRouter>
  );
};

export default App;
