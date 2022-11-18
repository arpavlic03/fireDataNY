import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { isEmpty } from "lodash";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "chartjs-adapter-moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

function mapFunction(string) {
  var newString = string.split(":");
  let min = parseInt(newString[0]) * 60;
  return min + parseInt(newString[1]);
}

export default function Graph({ graphData, filter }) {
  const [graph, setGraph] = React.useState(null);
  const [labels, setLabels] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [data, setData] = React.useState([]);

  const setGraphData = async () => {
    const { borough, year, incident } = filter;

    const newOptions = {
      responsive: true,
      scales: {
        y: {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, ticks) {
              var mins = Math.floor(value / 60);
              var seconds = Math.floor(value % 60);
              return mins + ":" + seconds;
            },
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            labelColor: function (context) {
              return {
                borderColor: "rgb(0, 0, 255)",
                backgroundColor: "rgb(255, 0, 0)",
                borderWidth: 2,
                borderDash: [2, 2],
                borderRadius: 2,
              };
            },
            labelTextColor: function (context) {
              return "#ffffff";
            },
            label: function (context) {
              let label = context.dataset.label || "";

              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                // label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                var mins = Math.floor(parseInt(context.parsed.y) / 60);
                var seconds = Math.floor(parseInt(context.parsed.y) % 60);
                label = mins + ":" + seconds;
              }
              return "Average Response Time: " + label;
            },
          },
        },
        title: {
          display: true,
          text: year !== null ? borough + " " + incident + " " + year.year() + " Chart" : borough + " " + incident + " "  + " Chart",
          font: {
            size: 24,
            style: "italic",
            family: "Helvetica Neue",
          },
        },
      },
    };
    setOptions(newOptions);
    let labels =
      borough != "All Boroughs"
        ? year !== null ? graphData.map((data) => data.incidentclassification) : graphData.map((data) => data.yearMonth)
        : year !== null ? graphData.map((data) => data.incidentborough) : graphData.map((data) => data.yearMonth); 

    const newData = {
      labels,
      datasets: [
        {
          label: "Average Response Times (mm:ss)",
          data: graphData.map((data) => mapFunction(data.averageresponsetime)),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
    setData(newData);
    setLabels(labels);
    return true;
  };

  const NoData = () => {
    return (
      <Box>
        <h2>No Data Here!</h2>
      </Box>
    );
  };

  React.useEffect(() => {
    async function cleanUpData() {
      if (!isEmpty(graphData)) {
        await setGraphData().then((response) => {
          setGraph(response);
        });
      }
    }
    cleanUpData();
  }, [graphData]);

  return (
    <Container>
      {graph ? <Bar options={options} data={data} height="230" /> : <NoData />}
    </Container>
  );
}
