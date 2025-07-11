import {PieChart, Pie, Cell, Legend, ResponsiveContainer, LabelList} from "recharts";

const COLORS = ["#0D4C65", "#92AABC", "#C3D0D9"];
const DonutPieChart = ({ data, dataKey, nameKey, title }) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px', padding: '0px', width: "24%" }}>
      <h3 style={{ textDecoration: "underline", cursor: "pointer", color: "#0D4C65", textAlign: 'center', marginTop: '20px'}}>{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="52%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            label={(entry) => `${entry[dataKey]}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
            ))}
          </Pie>
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            wrapperStyle={{ right: "0%", justifyContent:'space-around', lineHeight: "20px", width: "25%",fontSize:"14px" }}
            width="20%"
            
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutPieChart;