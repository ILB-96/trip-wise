"use client";
import styles from "./chart.module.css";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = (data: { data: any[] | undefined }) => {
  const tooltipStyle = {
    backgroundColor: "white",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: "1%",
    fontFamily: "helvetica, sans-serif",
    fontSize: "16px",
    padding: "5px",
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weekly Recap</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend />
          <Line
            type="monotone"
            dataKey="user"
            stroke="#8884d8"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="trip"
            stroke="#82ca9d"
            strokeDasharray="3 4 5 2"
          />
          <Line
            type="monotone"
            dataKey="attraction"
            stroke="#f88070"
            strokeDasharray="3 4 5 4"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
