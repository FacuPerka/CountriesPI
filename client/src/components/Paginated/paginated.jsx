import React from "react";
import styles from "../Paginated/paginated.module.css";

export default function Paginado({ countriesPerPage, countries, paginado, currentPage }) {
  const pageNumbers = Array.from(
    { length: Math.ceil(countries / countriesPerPage) },
    (_, index) => index + 1
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      paginado(prevPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      const nextPage = currentPage + 1;
      paginado(nextPage);
    }
  };

  return (
    <div className={styles.paginatedContainer}>
      <div className={styles.paginatedButtons}>
        <button
          className={`${styles.paginatedButton} ${styles.left}`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <i></i>
        </button>
        <div className={styles.counter}>
          {currentPage} / {pageNumbers.length}
        </div>
        <button
          className={`${styles.paginatedButton} ${styles.right}`}
          onClick={handleNextPage}
          disabled={currentPage === pageNumbers.length}
        >
          <i></i>
        </button>
      </div>
    </div>
  );
}
