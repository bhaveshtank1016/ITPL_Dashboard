import React from "react";
import { Pagination } from "@mui/material";

function PageLeavePagination({ setPage, totalPages }) {
  const changePages = (event, value) => {
    setPage(value);
  };

  return (
    <div className="border bg-neutral-600 rounded-xl text-white w-full flex justify-center h-12 items-center">
      <Pagination count={totalPages} shape="rounded"  variant="outlined" onChange={changePages} />
    </div>
  );
}

export default PageLeavePagination;
