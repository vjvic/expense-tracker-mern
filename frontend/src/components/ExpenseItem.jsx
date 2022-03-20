import React from "react";
import { Box, Text, IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../features/expense/expenseSlice";

const ExpenseItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Box as="li" display="flex" justifyContent="space-between" my="2">
      <div>
        <Text fontSize="lg" textTransform="capitalize">
          {item.name}
        </Text>
        <Text fontSize="sm" color="gray.500">
          <Text as="span" color={item.type === "income" ? "green" : "red"}>
            &#8369;{item.amount}
          </Text>
          {" - "}
          <span>{new Date(item.createdAt).toLocaleString("en-US")}</span>
        </Text>
      </div>
      <div>
        <IconButton
          colorScheme="red"
          size="md"
          icon={<FaTrash />}
          mr="2"
          onClick={() => dispatch(deleteExpense(item._id))}
        />
      </div>
    </Box>
  );
};

export default ExpenseItem;
