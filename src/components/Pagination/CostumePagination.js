import { Pagination } from "@material-ui/lab";
import React from "react";
import "./pagination.css";

const CostumePagination = ({ setPage, numPages = 10 }) => {
  const handleChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className="pagenation">
      <Pagination
        count={numPages}
        color="primary"
        onChange={(e) => handleChange(e.target.textContent)}
      />
    </div>
  );
};

export default CostumePagination;
