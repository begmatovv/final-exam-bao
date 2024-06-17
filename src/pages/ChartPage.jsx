import React from "react";
import { Bar, PieChart } from "../components";

function ChartPage() {
  return (
    <div className="flex lg:flex-row flex-col justify-between  items-center">
      <PieChart />
      <Bar />
    </div>
  );
}

export default ChartPage;
