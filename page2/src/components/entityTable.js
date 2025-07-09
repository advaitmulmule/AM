import "../css/entityTable.css";

const EntityTable = ({ paginatedData, selectedRows, setSelectedRows, toggleRow, toggleAll, sortDirection, setSortDirection }) => {
  return (
    <div
          style={{
            overflowX: "auto",
            paddingBottom: "16px",
            minHeight: "280px",
          }}
        >
          <table role="table" aria-label="Entity details table" tabIndex={0}>
            <thead>
              <tr>
                <th className="checkbox-cell" scope="col">
                  <input
                    type="checkbox"
                    aria-label="Select all entities"
                    checked={
                      paginatedData.length > 0 &&
                      paginatedData.every((_, i) => selectedRows.has(i))
                    }
                    onChange={toggleAll}
                  />
                </th>
                <th
                  scope="col"
                  className="sortable"
                  onClick={() =>
                    setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
                  }
                  aria-sort={sortDirection === "asc" ? "ascending" : "descending"}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
                    }
                  }}
                >
                  Entity Name
                </th>
                <th
                  scope="col"
                  className="sortable"
                  onClick={() =>
                    setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
                  }
                  aria-sort={sortDirection === "asc" ? "ascending" : "descending"}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
                    }
                  }}
                >
                  Entity Code
                </th>
                <th scope="col">Status</th>
                <th scope="col">Jurisdiction of Formation</th>
                <th scope="col">Company Level</th>
                <th scope="col">Listed/Unlisted</th>
                <th scope="col">Entity Level</th>
                <th scope="col">Group</th>
              </tr>
            </thead>
            <tbody>
                {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: "20px" }}>
                    No records found
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        aria-label={`Select entity ${row.entityName}`}
                        checked={selectedRows.has(idx)}
                        onChange={() => toggleRow(idx)}
                      />
                    </td>
                    <td className="entityName" tabIndex={0}>
                      {row.entityName}
                    </td>
                    <td>{row.entityCode}</td>
                    <td>{row.status}</td>
                    <td>{row.jurisdiction}</td>
                    <td>{row.companyLevel}</td>
                    <td>{row.listedUnlisted}</td>
                    <td>{row.entityLevel}</td>
                    <td>{row.group}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
    </div>
  );
};

export default EntityTable;
