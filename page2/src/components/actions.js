import * as XLSX from "xlsx";

// Common actions for importing and exporting files
  const handleImport = (event,setEntityData, setCurrentPage, setSelectedRows) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheet = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheet];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        // Normalize keys to camelCase internally
        const normalizedData = jsonData.map((row) => ({
          entityName: row["Entity Name"] || "",
          entityCode:
            row["Entity Code"] ||
            row["Entity Co..."] || // for the truncated header from image
            "",
          status: row["Status"] || "",
          jurisdiction: row["Jurisdiction of Formation"] || "",
          companyLevel: row["Company Level"] || "",
          listedUnlisted: row["Listed/Unlisted"] || "",
          entityLevel: row["Entity Level"] || "",
          group: row["Group"] || "",
        }));
        setEntityData(normalizedData);
        setCurrentPage(1);
        setSelectedRows(new Set());
      } catch (err) {
        alert("Error reading Excel file");
      }
    };
    reader.readAsArrayBuffer(file);
    event.target.value = null; // reset input to allow same file reimport
  };
const handleExport = (entityData) => {
    if (!entityData.length) {
      alert("No data to export");
      return;
    }
    const wsData = [
      [
        "Entity Name",
        "Entity Code",
        "Status",
        "Jurisdiction of Formation",
        "Company Level",
        "Listed/Unlisted",
        "Entity Level",
        "Group",
      ],
      ...entityData.map((d) => [
        d.entityName,
        d.entityCode,
        d.status,
        d.jurisdiction,
        d.companyLevel,
        d.listedUnlisted,
        d.entityLevel,
        d.group,
      ]),
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "EntityDetails");
    XLSX.writeFile(workbook, "EntityDetailsExport.xlsx");
};

export { handleImport, handleExport };