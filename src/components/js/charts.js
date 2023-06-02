import React from "react";
import Chart from "react-apexcharts";
import "../css/charts.css";

function Charts(props) {
  let state = {
    options: {
      colors: ["#000"],
      chart: {
        id: "realtime",
        type: "bar",
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000,
          },
        },
        zoom: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
        },
      },
      labels: ["Target Sales"],
      stroke: {
        lineCap: 'round'
      },
      track: {
        background: "#fff",
        strokeWidth: "67%",
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35,
        },
      },
      xaxis: {
        categories: props.categories,
        labels: {
          style: {
            colors: "black",
          },
          formatter: function (val) {
            if (val) {
              return val.length > 6 ? val.slice(0, 6) + "..." : val;
            }
          },
          maxHeight: 50,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "black",
          },
        },
      },
      tooltip: {
        theme: "dark",
        x: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
    series: [
      props.type !== "radialBar"
        ? {
            name: props.unit,
            data: props.data,
          }: {
            data: props.data
          }
    ],
  };

  return (
    <div className="charts">
      <h1>{props.title}</h1>
      <Chart
        options={state.options}
        series={state.series}
        type={props.type}
        height={(props.type === "treemap"? "90%" : 300)}
        width={"100%"}
      />
    </div>
  );
}

export default Charts;