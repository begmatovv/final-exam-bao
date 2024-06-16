import React from "react";
import { Bar, PieChart } from "../components";

function ChartPage() {
  return (
    <div className="flex px-10 mt-10 flex-col justify-between items-center">
      <PieChart />
      <Bar />
    </div>
  );
}

export default ChartPage;
