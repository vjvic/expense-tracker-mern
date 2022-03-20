import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Text } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ text }) => {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      maxW="100%"
      boxShadow="base"
      p="3"
      borderRadius="10px"
      backgroundColor={"#fff"}
    >
      <Box mb="1rem">
        <Text fontSize="xl" fontWeight="bold">
          {text}
        </Text>
        <Text fontSize="1xl" color={text === "Expense" ? "red" : "green"}>
          &#8369;1000
        </Text>
      </Box>
      <Box maxW="300px" m="auto">
        <Pie data={data} />
      </Box>
    </Box>
  );
};

export default PieChart;
