import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";


const NonComplianceBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 10, right: 50, left: 20, bottom: 10 }}
      >
        <XAxis type="number" hide />
        <YAxis dataKey="type" type="category" width={200} tick={{ fill: "#333" }} />
        <Tooltip />
        <Bar dataKey="count" fill="#0D4C65">
          <LabelList dataKey="count" position="right" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default NonComplianceBarChart;