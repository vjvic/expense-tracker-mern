import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Text } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ text, totalAmount, bgColor, label, data: chartData }) => {
  const data = {
    labels: label,
    datasets: [
      {
        label: text,
        data: chartData,
        backgroundColor: bgColor,
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
          &#8369;{totalAmount.toFixed(2)}
        </Text>
      </Box>
      <Box maxW="300px" m="auto">
        <Pie data={data} />
      </Box>
    </Box>
  );
};

export default PieChart;
