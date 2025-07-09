import React, { useState, useEffect, useMemo } from "react";
import "./taxDash.css";
// Components
import Navbar from "./components/navbar";
import Filters from "./components/filters";
import EntityTable from "./components/entityTable";
import Pagination from "./components/pagination";
import Search from "./components/search";
import {handleImport, handleExport} from "./components/actions";


const initialFilters = {
  dealFund: "",
  entity: "",
  compliance: "",
  classification: "",
  status: "",
  type: "",
};

const dropdownOptions = {
  dealFund: ["Deal/Fund", "Deal 1", "Deal 2", "Fund A", "Fund B"],
  entity: ["Entity", "Entity A", "Entity B", "Entity C"],
  compliance: ["Compliance", "Compliant", "Non-Compliant"],
  classification: ["Classification", "Class A", "Class B"],
  status: ["Status", "Enable", "Disable"],
  type: ["Type", "Type 1", "Type 2", "Type 3"],
};

const TaxDashboard = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [entityData, setEntityData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [sortDirection, setSortDirection] = useState("asc");
  const [showMore, setShowMore] = useState(false);

  // Import and export functions
    const handleImportFile = (event) => {
        handleImport(event, setEntityData, setCurrentPage, setSelectedRows);
    };
    const handleExportFile = () => {
        handleExport(entityData);
    }

  useEffect(() => {
    // Filtering and sorting logic
    let data = [...entityData];
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        if (key === "status") {
          data = data.filter(
            (d) => d.status.toLowerCase() === value.toLowerCase()
          );
        } else if (key === "type") {
          data = data.filter((d) =>
            d.group.toLowerCase().includes(value.toLowerCase())
          );
        } else if (key === "dealFund") {
          // No direct mapping in available data, skipping filter for now
          // Placeholder: data = data.filter(d => ...)
        } else if (key === "entity") {
          data = data.filter((d) =>
            d.entityName.toLowerCase().includes(value.toLowerCase())
          );
        } else if (key === "compliance") {
          // No compliance field in data? Skipping filter for now
        } else if (key === "classification") {
          // No classification field - skipping filter
        }
      }
    });
    // Search filter on Entity Name or Entity Code
    if (searchTerm.trim() !== "") {
      data = data.filter(
        (d) =>
          d.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.entityCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Sort by entityCode ascending or descending
    data.sort((a, b) => {
      const codeA = a.entityCode.toLowerCase();
      const codeB = b.entityCode.toLowerCase();
      if (codeA < codeB) return sortDirection === "asc" ? -1 : 1;
      if (codeA > codeB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredData(data);
    setCurrentPage(1);
  }, [entityData, filters, searchTerm, sortDirection]);
 
  const paginatedData = useMemo(() => {
    // Pagination logic
    if (showMore) return filteredData;
    const start = 0;
    const end = currentPage * rowsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, rowsPerPage, showMore]);

    const toggleRow = (index) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) newSelectedRows.delete(index);
    else newSelectedRows.add(index);
    setSelectedRows(newSelectedRows);
  };
  // Toggle all visible rows
  const toggleAll = () => {
    if (
      paginatedData.length > 0 &&
      paginatedData.every((_, i) => selectedRows.has(i))
    ) {
      // All selected, deselect all
      setSelectedRows(new Set());
    } else {
      // Select all
      const allIndexes = new Set();
      paginatedData.forEach((_, i) => allIndexes.add(i));
      setSelectedRows(allIndexes);
    }
  };

  const handleRefresh = () => {
    setFilters(initialFilters);
    setSearchTerm("");
    setSelectedRows(new Set());
    setCurrentPage(1);
    setShowMore(false);
  };

  return (
    <>
      <Navbar />
      <Filters filters={filters} setFilters={setFilters} dropdownOptions={dropdownOptions} />
      <section className="container" aria-label="Entity details information">
        <div className="container-header">
          <div>Entity Details</div>
          <div className="container-actions" aria-label="Import Export and Log actions">
            {/* Import: use hidden input button with label */}
            <label htmlFor="import-file" className="icon-button" title="Import Excel file">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M5 20h14v-2H5v2zm7-18L5.33 9H9v6h6V9h3.67L12 2z" />
              </svg>
              Import
            </label>
            <input
              id="import-file"
              type="file"
              accept=".xls,.xlsx"
              onChange={handleImportFile}
              style={{ display: "none" }}
              aria-label="Import Excel file"
            />
            {/* Export */}
            <button
              type="button"
              className="icon-button"
              title="Export to Excel"
              onClick={handleExportFile}
              aria-label="Export to Excel"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path d="M19 11h-4V7h-2v4H5l7 7 7-7z" />
                <path d="M5 18v2h14v-2H5z" />
              </svg>
              Export
            </button>
            {/* Log - just a placeholder for now */}
            <button type="button" className="icon-button" title="Log details">
              <svg
                aria-hidden="true"
                fill="currentColor"
                height="16"
                width="16"
                viewBox="0 0 24 24"
              >
                <path d="M3 3h18v2H3zM3 19h18v2H3zM3 11h18v2H3z" />
              </svg>
              Log
            </button>
          </div>
        </div>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleRefresh={handleRefresh} />
        <EntityTable 
            paginatedData={paginatedData} 
            selectedRows={selectedRows} 
            setSelectedRows={setSelectedRows} 
            toggleRow={toggleRow} 
            toggleAll={toggleAll}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
        />
        <Pagination 
            currentPage={currentPage} 
            rowsPerPage={rowsPerPage} 
            setRowsPerPage={setRowsPerPage} 
            setCurrentPage={setCurrentPage} 
            filteredData={filteredData}
            showMore={showMore} 
            setShowMore={setShowMore} 
        />
      </section>
    </>
  );
};

export default TaxDashboard;
