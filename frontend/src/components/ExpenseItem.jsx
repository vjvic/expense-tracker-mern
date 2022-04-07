import React from "react";
import { Box, Text, IconButton, useToast } from "@chakra-ui/react";
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExpense,
  getExpenseById,
  openEdit,
} from "../features/expense/expenseSlice";

const ExpenseItem = ({ item, open }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { isError, message } = useSelector((state) => state.expense);

  const handleEdit = () => {
    dispatch(getExpenseById(item._id));
    dispatch(openEdit());
    open();

    if (isError) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="li" display="flex" justifyContent="space-between" my="2">
      <div>
        <Text fontSize="lg" textTransform="capitalize">
          {item.category}
        </Text>
        <Text fontSize="sm" color="gray.500">
          <Text as="span" color={item.type === "income" ? "green" : "red"}>
            &#8369;{item.amount.toFixed(2)}
          </Text>
          {" - "}
          <span>{new Date(item.createdAt).toLocaleString("en-US")}</span>
        </Text>
      </div>
      <div>
        <IconButton
          colorScheme="gray"
          size="md"
          icon={<FaRegEdit />}
          mr="2"
          onClick={handleEdit}
        />
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
