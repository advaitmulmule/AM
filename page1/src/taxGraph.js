import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import DonutPieChart from "./components/donutPieChart";
import NonComplianceBarChart from "./components/nonComplianceBarChart";
import "./css/taxGraph.css";

const AMTaxDashboard = () => {
  // State for excel loaded data charts
  const [complianceData, setComplianceData] = useState([]);
  const [classificationData, setClassificationData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [nonComplianceBreakdown, setNonComplianceBreakdown] = useState([]);

  // State for Hot Topics coming from backend (simulate with useEffect & mock fetch)
  const [hotTopics, setHotTopics] = useState([]);

  // Fetch hot topics (simulate API call)
  useEffect(() => {
    // Simulated backend data
    const simulatedHotTopics = [
      {
        id: 1,
        imageUrl: "https://placehold.co/350x150?text=Trade+and+Tariffs+Resources",
        altText:
          "A large cargo container ship transporting stacked multi-color containers through a sea harbor from aerial view, representing international trade and tariffs resources",
        title: "Trade and Tariffs Resources",
        description: "News & Insights, Webinar Recording, etc.",
        link: "#",
      },
      {
        id: 2,
        imageUrl: "https://placehold.co/350x150?text=A%26M%27s+Expansion+into+Europe",
        altText:
          "Stylized digital globe with connecting lines and dots over a dark background representing global expansion and network, titled A&M's Expansion Into Europe",
        title: "A&M's Expansion Into Europe",
        description: "View A&M's Leadership Interview Series",
        link: "#",
      },
      {
        id: 3,
        imageUrl: "https://placehold.co/350x150?text=March+Global+Tax+All+Hands+Call",
        altText:
          "Blue tech-themed globe with flowing network lines and digital grid effect, conveying a global tax conference or call event",
        title: "March Global Tax All Hands Call",
        description: "",
        link: "#",
      },
    ];
    setHotTopics(simulatedHotTopics);
  }, []);

  // Function to handle Excel file upload and parse data for charts
  
  return (
    <>
        <Navbar />
      <main className="page-wrapper" role="main" aria-label="A&M Tax Dashboard Main Content">
        {/* Left/Main content area */}
        <section className="main-content" aria-label="Dashboard Data and Charts">
          {/* Top level donut charts */}
          <div className="top-charts" aria-label="Summary charts for Compliance, Classification, Status and Type">
            <DonutPieChart
              title="Compliance"
              data={complianceData.length ? complianceData : [
                { name: "Compliant", value: 70 },
                { name: "Non Compliant", value: 10 },
              ]}
              dataKey="value"
              nameKey="name"
            />
            <DonutPieChart
              title="Classification"
              data={classificationData.length ? classificationData : [
                { name: "New", value: 13 },
                { name: "Existing", value: 936 },
              ]}
              dataKey="value"
              nameKey="name"
            />
            <DonutPieChart
              title="Status"
              data={statusData.length ? statusData : [
                { name: "Active", value: 50 },
                { name: "Dormant", value: 20 },
                { name: "Dissolved", value: 10 },
              ]}
              dataKey="value"
              nameKey="name"
            />
            <DonutPieChart
              title="Type"
              data={typeData.length ? typeData : [
                { name: "Investment Making", value: 50 },
                { name: "Investment Holding", value: 20 },
                { name: "Franchise", value: 10 },
              ]}
              dataKey="value"
              nameKey="name"
            />
          </div>

          {/* Lower charts */}
          <div className="bottom-charts">
            <section
              className="chart-box"
              aria-label="Detailed Non Compliance Breakdown Chart"
            >
              <h3 style={{ textDecoration: "underline", cursor: "pointer", color: "#0D4C65", textAlign: 'center' }}>Non-Compliance Breakdown</h3>
              <NonComplianceBarChart
                data={
                  nonComplianceBreakdown.length
                    ? nonComplianceBreakdown
                    : [
                        { type: "Outstanding Legal Registration Documents", count: 3 },
                        { type: "Outstanding Tax Filing", count: 2 },
                        { type: "Missing Tax Quarterly Check", count: 4 },
                        { type: "Missing Ownership Details", count: 15 },
                        { type: "Missing Director Details", count: 40 },
                        { type: "Missing Board Meeting Notes", count: 20 },
                      ]
                }
              />
            </section>
            <section
              className="calender-box"
              aria-label="Upcoming Events Section"
              style={{ textAlign: "center" }}
            >
              <h3 style={{ textDecoration: "underline", cursor: "pointer", color: "#0D4C65" }}>Upcoming Events</h3>
              <div style={{ fontSize: 26, color: "#0D4C65", fontWeight: "bold", position: 'relative', top: '25%' }} aria-live="polite" aria-atomic="true">
                Calendar
              </div>
              {/* Placeholder for calendar or event widget */}
            </section>
          </div>
        </section>
        {/* Right sidebar for hot topics */}
        <aside
          className="side-panel"
          aria-label="A and M Hot Topics"
          tabIndex={-1}
        >
          <h3 id="hot-topics-heading">A&amp;M Hot Topics</h3>
          {hotTopics.length === 0 && <p>Loading hot topics...</p>}
          {hotTopics.map(({ id, imageUrl, altText, title, description, link }) => (
            <a
              className="hot-topic-card"
              href={link}
              key={id}
              aria-labelledby={`topic-title-${id} topic-desc-${id}`}
              role="article"
            >
              <img
                src={imageUrl}
                alt={altText}
                style={{ backgroundColor: "#092d48" }}
                onError={(e) => (e.target.style.display = "none")}
              />
              <div className="hot-topic-content">
                <h4 id={`topic-title-${id}`}>{title}</h4>
                {description && (
                  <small id={`topic-desc-${id}`}>{description} &rarr;</small>
                )}
              </div>
            </a>
          ))}
        </aside>
      </main>
    </>
  );
};

export default AMTaxDashboard;

 