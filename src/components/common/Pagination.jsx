import React, { useState } from "react";

export default function Pagination({
  itemLength = 200,
  itemPerPage = 10,
  setPage = (num) => {},
  currentPage,
}) {
  const totalPages = Math.ceil(itemLength / itemPerPage);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageClick = async (page) => {
    if (page === currentPage || page < 1 || page > totalPages || isLoading) return;
    
    setIsLoading(true);
    try {
      await setPage(page);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {totalPages > 1 ? (
        <React.Fragment>
          {" "}
          <li onClick={() => handlePageClick(currentPage - 1)}>
            <a className={`page-numbers style`}>
              <i className="far fa-angle-left" />
            </a>
          </li>
          {[...Array(totalPages)].slice(0, 4).map((_, index) => {
            const page = index + 1;
            return (
              <li key={page}>
                <a
                  className={`page-numbers ${
                    currentPage === page ? "current" : ""
                  }`}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </a>
              </li>
            );
          })}
          {currentPage >= 5 && (
            <li>
              <a className={`page-numbers current`}>{currentPage}</a>
            </li>
          )}
          {totalPages >= 5 && currentPage != totalPages && (
            <li>
              <a className={`page-numbers dot`}>...</a>
            </li>
          )}
          <li onClick={() => handlePageClick(currentPage + 1)}>
            <a className={`page-numbers style`}>
              <i className="far fa-angle-right" />
            </a>
          </li>{" "}
        </React.Fragment>
      ) : (
        ""
      )}
    </>
  );
}

