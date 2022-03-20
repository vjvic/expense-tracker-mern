import React, { useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  GridItem,
  Text,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { PieChart, ExpenseForm } from "../components";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpense, reset } from "../features/expense/expenseSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { expense } = useSelector((state) => state.expense);

  useEffect(() => {
    dispatch(getAllExpense());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.800")}
      minH={"calc(100vh - 60px)"}
    >
      <ExpenseForm isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      <Container maxW="container.lg" py={"60px"}>
        <Grid templateColumns="repeat(2, 1fr)" gap="6" mb="40px">
          <GridItem>
            <PieChart text={"Income"} />
          </GridItem>

          <GridItem>
            <PieChart text={"Expense"} />
          </GridItem>
        </Grid>

        <Box
          boxShadow="base"
          p="1rem"
          borderRadius="10px"
          backgroundColor={"#fff"}
        >
          <Box
            mb="5"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="xl" fontWeight="bold">
              Total Balance{" "}
              <Box as="span" color="green">
                &#8369;1000
              </Box>
            </Text>

            <Button leftIcon={<FaPlus />} onClick={onOpen}>
              Add Expense
            </Button>
          </Box>
          <Box h="200px" overflowY="auto">
            <ul>
              {expense.map((expense) => (
                <Box
                  as="li"
                  display="flex"
                  justifyContent="space-between"
                  my="2"
                  key={expense.id}
                >
                  <div>
                    <Text fontSize="xl" textTransform="capitalize">
                      {expense.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      <span>&#8369;{expense.amount}</span>
                      {" - "}
                      <span>
                        {new Date(expense.createdAt).toLocaleString("en-US")}
                      </span>
                    </Text>
                  </div>
                  <div>
                    <IconButton
                      colorScheme="red"
                      size="md"
                      icon={<FaTrash />}
                      mr="2"
                    />
                  </div>
                </Box>
              ))}
            </ul>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
