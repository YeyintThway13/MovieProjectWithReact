import { Badge } from "@material-ui/core";
import React from "react";
import { img_300, unavailable } from "../../config/config.js";
import "./singleContent.css";
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({ id, poster, name, media_type, date, rating }) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={rating}
        color={rating > 6 ? "primary" : "secondary"}
      ></Badge>
      <img
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt="movie poster"
        className="poster"
      />
      <b className="title">{name}</b>
      <div className="subtitles">
        <span>{media_type === "tv" ? "Tv Serie" : "Movie"}</span>
        <span>{date}</span>
      </div>
    </ContentModal>
  );
};

export default SingleContent;
