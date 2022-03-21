import React, { useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  GridItem,
  Text,
  Button,
  useDisclosure,
  useColorModeValue,
  Spinner,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { PieChart, ExpenseForm, ExpenseItem } from "../components";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpense, reset } from "../features/expense/expenseSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { expense, isLoading } = useSelector((state) => state.expense);

  const backround = useColorModeValue("gray.50", "gray.800");

  //Sort expense by date
  const sortExpense = (expense) => {
    const expenseForSort = [...expense];
    return expenseForSort.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  //Get the total income
  const totalIncome = expense
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  //Get the total Expense
  const totalExpense = expense
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  //Get the total balance

  const totalBalance = totalIncome - totalExpense;

  useEffect(() => {
    dispatch(getAllExpense());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH={"calc(100vh - 60px)"}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );

  return (
    <Box bg={backround} minH={"calc(100vh - 60px)"}>
      <ExpenseForm isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      <Container maxW="container.lg" py={"60px"}>
        <Grid templateColumns="repeat(2, 1fr)" gap="6" mb="40px">
          <GridItem>
            <PieChart text={"Income"} totalAmount={totalIncome} />
          </GridItem>

          <GridItem>
            <PieChart text={"Expense"} totalAmount={totalExpense} />
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
              <Box as="span" color={totalBalance <= 0 ? "red" : "green"}>
                &#8369;{totalBalance}
              </Box>
            </Text>

            <Button leftIcon={<FaPlus />} onClick={onOpen}>
              Add Expense
            </Button>
          </Box>
          <Box h="200px" overflowY="auto">
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              align="stretch"
              as="ul"
            >
              {expense.length <= 0 ? (
                <Text textAlign={"center"}>No expense item</Text>
              ) : (
                sortExpense(expense).map((item) => (
                  <ExpenseItem key={item._id} item={item} />
                ))
              )}
            </VStack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
