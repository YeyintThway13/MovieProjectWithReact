import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { Movie, Search, Tv, Whatshot } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

const Header = () => {
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(!open);
  };

  return (
    <header>
      <div className="inner-width">
        <span className="logo" onClick={window.scroll(0, 0)}>
          <h1>📽️ Doratainment 📽️</h1>
        </span>
        <div className="inner-width">
          <Link to="/"></Link>
          {open ? (
            <CloseIcon
              className="menu-toggle-btn"
              onClick={openHandler}
            ></CloseIcon>
          ) : (
            <MenuIcon
              className="menu-toggle-btn"
              onClick={openHandler}
            ></MenuIcon>
          )}
          <nav className={`navigation-menu ${open ? "active" : ""}`}>
            <Link to="/" className="tab" onClick={openHandler}>
              <Whatshot className="icon trending"></Whatshot> Trending
            </Link>
            <Link to="/movies" className="tab" onClick={openHandler}>
              <Movie className="icon movie"></Movie> Movies
            </Link>
            <Link to="tvseries" className="tab" onClick={openHandler}>
              <Tv className="icon tv"></Tv> Tv Series
            </Link>
            <Link to="/search" className="tab" onClick={openHandler}>
              <Search className="icon search"></Search> Search
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
