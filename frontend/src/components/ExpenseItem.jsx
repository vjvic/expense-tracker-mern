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
        <Text fontSize="xl" textTransform="capitalize">
          {item.name}
        </Text>
        <Text fontSize="sm" color="gray.500">
          <span>&#8369;{item.amount}</span>
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
