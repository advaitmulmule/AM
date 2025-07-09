import "../css/pagination.css";

const Pagination = ({ currentPage, rowsPerPage, setRowsPerPage, setCurrentPage, filteredData, showMore, setShowMore }) => {
  return (
    <div className="pagination-container">
          <div className="pagination-left" aria-live="polite" aria-atomic="true">
            Total {filteredData.length} entries
          </div>
          <div className="pagination-right" role="navigation" aria-label="Table pagination">
            <label htmlFor="rowsPerPage">Rows per page:</label>
            <select
              id="rowsPerPage"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
                setShowMore(false);
              }}
            >
              {[10, 25, 50, 100].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                setShowMore(false);
              }}
              disabled={currentPage === 1}
              className={currentPage === 1 ? "disabled" : ""}
              aria-label="Previous page"
              title="Previous page"
            >
              &lt;
            </button>
            <span aria-live="polite" aria-atomic="true" style={{ minWidth: "24px", display: "inline-block" }}>
              {currentPage}
            </span>
            <button
              onClick={() => {
                if (currentPage * rowsPerPage < filteredData.length) {
                  setCurrentPage((p) => p + 1);
                  setShowMore(false);
                }
              }}
              disabled={currentPage * rowsPerPage >= filteredData.length}
              className={
                currentPage * rowsPerPage >= filteredData.length ? "disabled" : ""
              }
              aria-label="Next page"
              title="Next page"
            >
              &gt;
            </button>
            <label htmlFor="gotoPage" style={{ marginLeft: "12px" }}>
              Go to
            </label>
            <input
              id="gotoPage"
              type="number"
              min="1"
              max={Math.ceil(filteredData.length / rowsPerPage) || 1}
              value={currentPage}
              onChange={(e) => {
                let val = Number(e.target.value);
                if (val < 1) val = 1;
                if (val > Math.ceil(filteredData.length / rowsPerPage))
                  val = Math.ceil(filteredData.length / rowsPerPage);
                setCurrentPage(val);
                setShowMore(false);
              }}
              aria-label="Go to page number"
            />
          </div>

          
          <div className="load-more-container">
            <button
              className="btn"
              onClick={() => {
                setShowMore(true);
              }}
              aria-label="Load more entries"
              title="Load more entries"
            >
              Load More +
            </button>
          </div>
    </div>
  );
};

export default Pagination;
