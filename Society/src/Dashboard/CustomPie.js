import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import useGetApi from "../pages/CustomHook/useGetApi";

const settings = {
  margin: { right: 5 },
  width: 300,
  height: 300,
  hideLegend: false, // show legend if needed
};

export default function CustomPie() {
  const { getData, getLoading, getError } = useGetApi("user");

  // Show loading/error
  if (getLoading) return <p>Loading...</p>;
  if (getError) return <p>Error: {getError}</p>;

  // Example: Count how many users per username (or any grouping)
  const chartData = getData.map((user, index) => ({
    id: index,
    value: user.userid, // or some other numeric field
    label: user.username,
  }));

  return (
    <PieChart
      series={[
        {
          innerRadius: 50,
          outerRadius: 100,
          data: chartData,
          arcLabel: (item) => `${item.value}`, // label inside pie
        },
      ]}
      {...settings}
    />
  );
}
