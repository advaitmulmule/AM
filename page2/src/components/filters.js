import "../css/filters.css";

const Filters = ({ filters, setFilters, dropdownOptions }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section aria-label="Filter entities" className="filters">
      {Object.entries(dropdownOptions).map(([key, options]) => (
        <select
          id={key}
          key={key}
          name={key}
          value={filters[key]}
          onChange={handleFilterChange}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
      ))}
    </section>
  );
};

export default Filters;
