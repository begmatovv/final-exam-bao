import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import ApexCharts from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = () => {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => state.userState);
  const { data: recipe } = useCollection("recepts", ["uid", "==", user.uid]);
  const categoryCounts = {};
  recipe &&
    recipe.forEach((item) => {
      const category = item.category;
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });

  useEffect(() => {
    const categorie = Object.keys(categoryCounts);
    const counts = Object.values(categoryCounts);
    setCategories(categorie);
    setSeries(counts);
  }, [recipe]);

  const options = {
    chart: {
      width: 480,
      type: "pie",
    },
    labels: categories,
    responsive: [
      {
        breakpoint: 1600,
        options: {
          chart: {
            width: 480,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="mb-10">
      <h2 className="text-center text-xl font-bold mb-5">
        Food Category
      </h2>
      <div id="chart" className="w-full">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          width={480}
        />
      </div>
    </div>
  );
};

export default PieChart;
