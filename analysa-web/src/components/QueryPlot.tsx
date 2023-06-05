import { Paper } from "@mui/material";
import { useEffect, useRef } from "react";
import Plot from "react-plotly.js";

function unpack(queryResult: Map<string, Map<string, number>>, key: string) {
  let unpackedArr = [];
  for (let metric of queryResult.keys()) {
    if (key === "") {
      unpackedArr.push(metric);
    } else {
      unpackedArr.push(queryResult.get(metric).get(key));
    }
  }
  return unpackedArr;
}
const QueryPlot = ({ queryResultJson }) => {
  let queryResultObject = new Map(Object.entries(queryResultJson));
  for (var metric in queryResultJson) {
    queryResultObject.set(
      metric,
      new Map(Object.entries(queryResultObject.get(metric)))
    );
  }

  const stageCanvasRef = useRef(null);

  // useEffect will run on stageCanvasRef value assignment
  useEffect(() => {
    // The 'current' property contains info of the reference:
    // align, title, ... , width, height, etc.
    if (stageCanvasRef.current) {
      let height = stageCanvasRef.current.offsetHeight;
      let width = stageCanvasRef.current.offsetWidth;
    }
  }, [stageCanvasRef]);
  console.log("starting plot working");
  return (
    <Paper ref={stageCanvasRef} elevation={5} style={{ width: "100%" }}>
      <Plot
        data={[
          {
            x: unpack(queryResultObject, ""),
            // x: [1, 2, 3, 4, 5],
            close: unpack(queryResultObject, "lower_bound"),
            low: unpack(queryResultObject, "lower_bound"),
            high: unpack(queryResultObject, "upper_bound"),
            open: unpack(queryResultObject, "upper_bound"),

            // cutomise colors
            increasing: { line: { color: "black" } },
            decreasing: { line: { color: "red" } },

            type: "candlestick",
            xaxis: "x",
            yaxis: "y",
          },
          // { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{
          width: window.innerWidth * 0.5,
          height: window.innerHeight * 0.5,
          // width: 320,
          // height: 240,
          dragmode: "zoom",
          showlegend: false,
          xaxis: {
            rangeslider: {
              visible: false,
            },
          },
        }}
      />
    </Paper>
  );
};

export default QueryPlot;
