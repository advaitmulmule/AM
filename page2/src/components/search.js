import "../css/search.css";

const Search = ({ searchTerm, setSearchTerm, handleRefresh }) => {
  return (
    <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "10px 24px",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div className="search-box">
            <input
              type="search"
              placeholder="Search"
              value={searchTerm}
              aria-label="Search entities by name or code"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="btn-group" role="group" aria-label="Action buttons">
            <button className="btn" title="Add Fund / Entity" type="button">
              Add Fund / Entity
            </button>
            <button
              aria-label="Refresh Filters and Data"
              onClick={handleRefresh}
              className="btn orange small"
              type="button"
              title="Refresh"
            >
              &#x21bb;
            </button>
            <button
              aria-label="Toggle Filter"
              className="btn orange small"
              type="button"
              title="Filter"
              onClick={() => {
                alert("Filter toggle action not implemented in image UI");
              }}
            >
              &#9776;
            </button>
          </div>
    </div>
  );
};

export default Search;
